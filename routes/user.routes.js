import express from 'express';
import { getAllUsers, addUser } from '../controllers/user.controller.js';
import { body, validationResult} from 'express-validator'
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

router.post('/register',
  [
    body('username').trim().notEmpty().withMessage('Please Enter Username').isLength({min:3}).withMessage('User name required more that 3 character'),
    body('email').notEmpty().withMessage('Plese Enter Email').isEmail().withMessage('Email not Valid Format'),
    body('password').notEmpty().withMessage('Please Enter Password').isLength({min:6}).withMessage('Password required moer than 6 character')
  
  ],
   async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Input Not Valid Please Enter And try Again",
        errors: errors.array(),
      });
    }

    try {
        await addUser(req.body) ;
        res.status(201).json({message: "User Added Successfully"})

      }catch(err) {
        res.status(500).json({ message: 'Error', error: err.message})
      }
    
  }

);


export default router;
