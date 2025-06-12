import express from 'express';
import userRoutes from './routes/user.routes.js'
import walletRoutes from './routes/wallet.routes.js'
const app = express();
const PORT = 3000;

app.use(express.json()); // ต้องมี ถ้าอยากอ่าน req.body แบบ JSON

app.use('/api', userRoutes); // *** สำคัญ ต้องใส่ เพื่อให้ router รู้จัก path ที่กำหนด
app.use('/wallet',walletRoutes)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
