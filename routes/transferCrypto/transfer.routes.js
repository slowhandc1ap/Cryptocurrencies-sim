import express from 'express'
import { transferCryptoController } from '../../controllers/Services/transferCrypto/transfer.controller.js'

const router = express.Router()
router.post('/', transferCryptoController)

export default router ;