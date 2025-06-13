import express from 'express';
import userRoutes from './routes/user.routes.js'
import walletRoutes from './routes/wallet.routes.js'
import currenciesRoutes from './routes/currencies.routes.js'
const app = express();
const PORT = 3000;

app.use(express.json()); // ต้องมี ถ้าอยากอ่าน req.body แบบ JSON

app.use('/info', userRoutes); 
app.use('/wallet',walletRoutes)
app.use('/currencies',currenciesRoutes)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
