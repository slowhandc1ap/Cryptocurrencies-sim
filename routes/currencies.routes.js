
import { getAllCurrenciesController , addCurrenciesController } from "../controllers/currencies.controller.js";
import express from 'express'
import validateCurrency from '../middleware/currencies.middleware.js'

const router = express.Router();
router.get('/', getAllCurrenciesController);
router.post('/register',validateCurrency, addCurrenciesController )

export default router