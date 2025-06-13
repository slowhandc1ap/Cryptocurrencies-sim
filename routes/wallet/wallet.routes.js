import express from 'express';
import {
    getAllwallets,
    createWallet,
    getAllwalletByUserId,
    deleteWallet,
    deleteWalletsByUser
} from '../../controllers/wallet/wallet.controller.js';

const router = express.Router();

// GET /wallets 
router.get('/', getAllwallets);

//getWallet BY ID 
router.get('/:userId',getAllwalletByUserId)

//POST /wallets 
router.post('/add', createWallet);

router.delete('/:walletId', deleteWallet);


router.delete('/user/:userId', deleteWalletsByUser); // Optional route



export default router;