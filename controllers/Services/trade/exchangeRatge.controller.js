// utils/getExchangeRate.js
const exchangeRates = {
  // base: USD = 1
  USD: 1,
  THB: 36.5,       // 1 USD = 36.5 THB
  BTC: 70000,      // 1 BTC = 70,000 USD
  ETH: 3500,       // 1 ETH = 3,500 USD
  USDT: 1,         // Tether (stablecoin)
  BNB: 600,        // Binance Coin
  DOGE: 0.15,      // Dogecoin (แก้จาก DOG → DOGE)
  XRP: 0.6,        // Ripple
  ADA: 0.45        // Cardano
};
  
  export default function getExchangeRate(symbolFrom, symbolTo) {
    const fromRate = exchangeRates[symbolFrom.toUpperCase()];
    const toRate = exchangeRates[symbolTo.toUpperCase()];
  
    if (!fromRate || !toRate) {
      throw new Error(`Cannot find rate for ${symbolFrom} or ${symbolTo}`);
    }
  
    const rate = fromRate / toRate;
    return parseFloat(rate.toFixed(8));
  }
  