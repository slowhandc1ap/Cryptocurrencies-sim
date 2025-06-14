import Wallet from "../../../models/wallet/Wallet.js";
import WalletBalance from "../../../models/wallet/WalletBalance.js";
import TradeOrder from "../../../models/trade/TradeOrder.js";
import { matchOrder } from "./tradeMatch.controller.js";
import Transaction from "../../../models/transaction/Transaction.js";
export const createTradeOrder = async (req, res) => {
    const { user_id, currency_id, type, price_per_unit, amount, fee, fee_currency_id } = req.body;

    try {
        const wallet = await Wallet.getByUserId(user_id);
        if (!wallet) return res.status(400).json({ error: "Wallet not found" });
     
        
        const targetBalance = await WalletBalance.getByWalletAndCurrency(wallet.id, currency_id);
        if (!targetBalance) return res.status(400).json({ error: "Target balance not found" });
      
        const totalCost = price_per_unit * amount;
        if (type === "sell" && targetBalance.amount < amount) {
            return res.status(400).json({ error: "Insufficient crypto balance" });
        }
     
        if (type === "buy") {
            const totalCost = price_per_unit * amount;
            

            await WalletBalance.lockAmount(wallet.id, currency_id, totalCost);
        } else {
            await WalletBalance.lockAmount(wallet.id, currency_id, totalCost);
        }
   

        // บันทึก order
        const order = new TradeOrder({
            user_id,
            currency_id,
            type,
            price_per_unit,
            amount,
            fee,
            fee_currency_id,
            status: "open"
        });


        const orderId = await TradeOrder.createOrder(order);

        const transactionObj = new Transaction({
            from_user_id: order.user_id,
            to_user_id: order.user_id,
            currency_id: order.currency_id,
            amount: order.amount,
            type: order.type, 
            reference_id: orderId
          });
          
          const txresult = Transaction.saveTransaction(transactionObj)
        

        // รอ matchOrder ให้เสร็จก่อน
        const savedOrder = await TradeOrder.findById(orderId); // ดึง order object จาก DB
        console.log((savedOrder));
        
        
        await matchOrder(savedOrder);
          

       

        //ตรงนี้
        res.json({ success: true, order_id: orderId, transaction :txresult });

    } catch (err) {
        res.status(500).json({ error: "Internal server error here", detail: err.message });
    }
};
