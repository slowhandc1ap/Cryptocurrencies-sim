import WalletBalance from "../../../models/wallet/WalletBalance";
import Currencies from "../../../models/currencies/Currencies";
import Transaction from "../../../models/transaction/Transaction";
import getExchangeRate from "../utils/getExchangeRate.js"

export async function convertBalanceController({ user_id, from_currency_id, to_currency_id, amount }) {
  try {
    const fromCurrency = await Currencies.getById(from_currency_id);
    const toCurrency = await Currencies.getById(to_currency_id);

    if (!fromCurrency || !toCurrency) throw new Error("Invalid currency selected.");

    // ห้ามแปลงเป็นตัวเอง
    if (from_currency_id === to_currency_id) throw new Error("Cannot convert to the same currency.");

    const fromWallet = await WalletBalance.getByUserAndCurrency(user_id, from_currency_id);
    const toWallet = await WalletBalance.getByUserAndCurrency(user_id, to_currency_id);

    if (!fromWallet) throw new Error("Source wallet not found.");
    if (fromWallet.amount < amount) throw new Error("Insufficient balance.");

    // ดึงอัตราแลกเปลี่ยน เช่น 1 BTC = 2,000,000 THB
    const rate = await getExchangeRate(fromCurrency.symbol, toCurrency.symbol);
    if (!rate) throw new Error("Cannot fetch exchange rate.");

    const convertedAmount = parseFloat((amount * rate).toFixed(toCurrency.decimals));

    // หักจาก wallet ต้นทาง
    await WalletBalance.decreaseAmount(fromWallet.wallet_id, from_currency_id, amount);

    // เติมเข้า wallet ปลายทาง
    if (!toWallet) {
      await WalletBalance.create(user_id, to_currency_id, convertedAmount);
    } else {
      await WalletBalance.increaseAmount(toWallet.wallet_id, to_currency_id, convertedAmount);
    }

    // Log เป็น transaction
    await Transaction.saveTransaction({
      from_user_id: user_id,
      to_user_id: user_id,
      currency_id: from_currency_id,
      amount: amount,
      type: "convert",
      reference_id: null
    });

    return {
      message: "Conversion successful",
      from: {
        currency: fromCurrency.symbol,
        amount
      },
      to: {
        currency: toCurrency.symbol,
        amount: convertedAmount
      },
      rate
    };

  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}