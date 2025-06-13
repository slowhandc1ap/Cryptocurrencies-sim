
import { getAllCurrenciesController , addCurrenciesController, getCurrenciesByid, updateCurencies, delteCurrenciesController } from "../../controllers/currencies/currencies.controller.js";
import express from 'express'
import validateCurrency from '../../middleware/currencies.middleware.js'

const router = express.Router();
router.get('/', getAllCurrenciesController);
//find by id
router.get('/:currencies_id',getCurrenciesByid)
router.post('/register',validateCurrency, addCurrenciesController )
router.put('/update/:curencies_id',validateCurrency, updateCurencies)
//delte 
router.delete('/delete/:currencies_id', delteCurrenciesController)

export default router