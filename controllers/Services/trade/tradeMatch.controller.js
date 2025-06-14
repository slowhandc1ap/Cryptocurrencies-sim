import Currencies from '../../../models/currencies/Currencies.js';
import getExchangeRate from './exchangeRatge.controller.js';
import TradeOrder from '../../../models/trade/TradeOrder.js';
import TradeMatch from '../../../models/trade/TradeMatch.js';
import WalletBalance from '../../../models/wallet/WalletBalance.js';
import Transaction from '../../../models/transaction/Transaction.js';
export async function matchOrder(newOrder) {
    const oppositeType = newOrder.type === 'buy' ? 'sell' : 'buy';

    const matchingOrders = await TradeOrder.getOpenOrders(
        newOrder.currency_id,
        oppositeType,
        newOrder.price_per_unit
    );
  
    
    
    

    let remainingAmount = newOrder.amount;

    for (const order of matchingOrders) {
        if (remainingAmount <= 0) break;

        const matchAmount = Math.min(remainingAmount, order.amount);
        const price = order.price_per_unit;
      
        const result = await TradeMatch.createMatch({
            buy_order_id: newOrder.type === 'buy' ? newOrder.id : order.id,
            sell_order_id: newOrder.type === 'sell' ? newOrder.id : order.id,
            price_per_unit: price,
            amount: matchAmount,
        });

        

        // --- เอาตรงนี้ไปแก้: หา symbol ของ fee_currency_id ด้วย Currencies.findById()
        const fromCurrency = await Currencies.findById(order.fee_currency_id);
        const toCurrency = await Currencies.findById(newOrder.fee_currency_id);

        if (!fromCurrency || !toCurrency) {
            throw new Error(`Currency not found for id ${order.fee_currency_id} or ${newOrder.fee_currency_id}`);
        }

        const exchangeRate = getExchangeRate(fromCurrency.symbol, toCurrency.symbol);
        const amountInFeeCurrency = matchAmount * price * exchangeRate;
        

        if (newOrder.type === 'buy') {
            await WalletBalance.lockAmount(newOrder.wallet_id, newOrder.fee_currency_id, amountInFeeCurrency);
            await WalletBalance.increaseAmount(newOrder.wallet_id, newOrder.currency_id, matchAmount);

            await WalletBalance.lockAmount(order.wallet_id, order.currency_id, matchAmount);
            await WalletBalance.increaseAmount(order.wallet_id, order.fee_currency_id, amountInFeeCurrency);
        } else {
            // สลับฝั่ง
            await WalletBalance.lockAmount(newOrder.wallet_id, newOrder.currency_id, matchAmount);
            await WalletBalance.increaseAmount(newOrder.wallet_id, newOrder.fee_currency_id, amountInFeeCurrency);

            await WalletBalance.lockAmount(order.wallet_id, order.fee_currency_id, amountInFeeCurrency);
            await WalletBalance.increaseAmount(order.wallet_id, order.currency_id, matchAmount);
        }

       
        

        

        await TradeOrder.updateStatus(newOrder.id,"matched");
        await TradeOrder.updateStatus(order.id,"matched");

        remainingAmount -= matchAmount;

        
        
    }
}
