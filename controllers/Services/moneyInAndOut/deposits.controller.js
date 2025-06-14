import Deposits from "../../../models/MoneyInAndOut/Deposits.js";
import Transaction from "../../../models/transaction/Transaction.js";
export async function depositsController(req,res) {
    try {
      const depositObj = new Deposits(req.body);
      const result = await Deposits.moneyIn(depositObj); // ส่ง object เข้า method
     
      
      const transactionObj = new Transaction({
        from_user_id: depositObj.user_id,
        to_user_id: depositObj.user_id,
        currency_id: depositObj.currency_id,
        amount: depositObj.amount,
        type: "deposit", 
        reference_id: result.depositRow.id 
      });
      
      const txresult = Transaction.saveTransaction(transactionObj)


      //save transaction
      
      res.status(200).json({
        message: "Deposit successful and amount updated",
        deposit: result.depositRow,
        walletBalance: result.updateBalance,
        transaction : txresult
        
      });
      
    } catch (error) {
        res.status(500).json({message: `Error whie depositData ${error}`})
    }
}