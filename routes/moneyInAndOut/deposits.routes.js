import express from "express";
import { depositsController } from "../../controllers/Services/moneyInAndOut/deposits.controller.js";

const router = express.Router()

router.post('/',depositsController)
export default router