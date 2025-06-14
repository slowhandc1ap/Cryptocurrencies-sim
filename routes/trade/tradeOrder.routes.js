import express from 'express'
import { createTradeOrder } from '../../controllers/Services/trade/tradeOrder.controller.js'

const router = express.Router()

router.post('/', createTradeOrder)
export default router