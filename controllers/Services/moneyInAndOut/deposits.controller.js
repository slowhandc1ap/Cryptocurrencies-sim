import Deposits from "../../../models/MoneyInAndOut/Deposits.js";

export async function depositsController(req,res) {
    try {
      const depositObj = new Deposits(req.body); // map เข้า constructor
      const result = await Deposits.moneyIn(depositObj); // ส่ง object เข้า method
      res.status(200).json({
        message: "Deposit successful and amount updated",
        deposit: result.deposit,
        walletBalance: result.walletBalance
      });
      
    } catch (error) {
        res.status(500).json({message: `Error whie depositData ${error}`})
    }
}