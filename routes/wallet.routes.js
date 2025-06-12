import express from 'express';
import {
    getAllwallets,
    createWallet,
    getAllwalletByUserId,
    deleteWallet
} from '../controllers/wallet.controller.js';

const router = express.Router();

// GET /wallets 
router.get('/', getAllwallets);

//getWallet BY ID 
router.get('/:userId',getAllwalletByUserId)

//POST /wallets 
router.post('/', createWallet);

router.delete('/:walletId', deleteWallet);


export default router;