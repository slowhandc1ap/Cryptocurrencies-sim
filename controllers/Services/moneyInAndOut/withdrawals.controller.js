import Withdrawals from "../../../models/MoneyInAndOut/Withdrawals.js"

export async function withdrawController(req , res) {
    try {
        const withDrawObj =  new Withdrawals(req.body)
        const result = await Withdrawals.moneyOut(withDrawObj)
        res.status(200).json({
            message: "Withdrawal successfull",
            withdrawals_Details: result.withDrawObj,
            UpdateBalance: result.updateBalance
        })
    } catch (error) {
        res.status(500).json({message: `Error while withdrawing data : ${error}`})
    }
}