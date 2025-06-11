import express from 'express';
import { getAllUsers, addUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to get users' });
  }
});

router.get('/', (req, res) => {
  res.json("hi");
});

router.post('/users', async (req, res) => {
  try {
    const userData = req.body;
    await addUser(userData);
    res.status(201).json({ message: 'User added!' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add user' });
  }
});

export default router;
