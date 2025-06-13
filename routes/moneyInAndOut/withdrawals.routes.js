import express from "express";
import { withdrawController } from "../../controllers/Services/moneyInAndOut/withdrawals.controller.js";



const router = express.Router()
router.post('/', withdrawController)

export default router