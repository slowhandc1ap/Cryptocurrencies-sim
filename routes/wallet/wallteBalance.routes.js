import express, { Router } from "express";
import { getAllWalletBalanceController,
         getWalletBalanceByIdController,
            addWalletBalanceController}
from '../../controllers/wallet/walletbalance.controller.js' ;

const router = express.Router()
router.get('/', getAllWalletBalanceController)
router.post('/addwb',addWalletBalanceController);

export default router