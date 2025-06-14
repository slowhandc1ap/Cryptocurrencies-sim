import express from 'express';
import userRoutes from './routes/user/user.routes.js'
import walletRoutes from './routes/wallet/wallet.routes.js'
import currenciesRoutes from './routes/currencies/currencies.routes.js'
import walletBalanceRoutes from './routes/wallet/wallteBalance.routes.js'
import depositsRoutes from './routes/moneyInAndOut/deposits.routes.js'
import withdrawalsRoutes from './routes/moneyInAndOut/withdrawals.routes.js'
import transferCryptoRoutes from './routes/transferCrypto/transfer.routes.js'
import transactionRoutes from './routes/transaction/transaction.routes.js'
import tradeOrderRoutes from './routes/trade/tradeOrder.routes.js'
const app = express();
const PORT = 3000;

app.use(express.json()); // ต้องมี ถ้าอยากอ่าน req.body แบบ JSON

app.use('/users', userRoutes); 
app.use('/wallet',walletRoutes)
app.use('/currencies',currenciesRoutes)
app.use('/walletBalance', walletBalanceRoutes)
app.use('/deposits', depositsRoutes)
app.use('/withdrawals', withdrawalsRoutes)
app.use('/transfer',transferCryptoRoutes)
app.use('/transaction',transactionRoutes)
app.use('/tradeorders',tradeOrderRoutes)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
