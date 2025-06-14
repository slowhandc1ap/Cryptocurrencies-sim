import Withdrawals from "../../../models/MoneyInAndOut/Withdrawals.js"
import Transaction from "../../../models/transaction/Transaction.js";
import Currencies from "../../../models/currencies/Currencies.js";
export async function withdrawController(req, res) {
    try {
        const withDrawObj = new Withdrawals(req.body)
        const result = await Withdrawals.moneyOut(withDrawObj)
     
        const currency = await Currencies.findById(withDrawObj.currency_id);

        if (currency.type !== 'fiat') {
            throw new Error("You can withdraw only fiat currency. Please convert first.");
        }

        const transactionObj = new Transaction({
            from_user_id: withDrawObj.user_id,
            to_user_id: withDrawObj.user_id,
            currency_id: withDrawObj.currency_id,
            amount: withDrawObj.amount,
            type: "deposit",
            reference_id: result.withDrawRow.id
        });

        const txresult = Transaction.saveTransaction(transactionObj)
        res.status(200).json({
            message: "Withdrawal successfull",
            withdrawals_Details: result.withDrawRow,
            UpdateBalance: result.updateBalance,

            transactionObj: txresult
        })
    } catch (error) {
        res.status(500).json({ message: `Error while withdrawing data : ${error}` })
    }
}