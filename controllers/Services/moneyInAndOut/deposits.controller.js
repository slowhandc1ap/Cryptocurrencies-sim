import Deposits from "../../../models/MoneyInAndOut/Deposits.js";

export async function depositsController(req,res) {
    try {
        const depositData = req.body
        const result = await Deposits.moneyIn(depositData)
        res.status(200).json({
            message: "Update amount successfully",
            Details: {
              result
            }
          });
      
    } catch (error) {
        res.status(500).json({message: `Error whie depositData ${error}`})
    }
}