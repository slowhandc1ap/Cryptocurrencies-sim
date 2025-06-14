import Transaction from "../../models/transaction/Transaction.js";

export async function saveTransactionController(req,res) {
    try {
        const transactionObj = new Transaction(req.body)
        const result = await Transaction.saveTransaction(transactionObj)
        res.status(201).json({
            message: "save transaciton succesfully",
            ...result
        })
    } catch (error) {
        
    }
}