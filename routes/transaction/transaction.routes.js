import express from 'express'
import { saveTransactionController } from '../../controllers/Services/saveTransaction.controller.js'

const router = express.Router()
router.post('/',saveTransactionController)
export default router;