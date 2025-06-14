import db from "../../config/storage.js";

class Transaction {
    constructor({id,from_user_id,to_user_id,currency_id,amount,type,reference_id,created_at}){
        this.id = id,
        this.from_user_id = from_user_id || 'outsystem',
        this.to_user_id = to_user_id || 'outsystem',
        this.currency_id = currency_id ,
        this.amount= amount,
        this.type = type,
        this.reference_id = reference_id || 'undifide',
        this.created_at = created_at || new Date().toISOString()
    }

    static saveTransaction(obj){
        try {
            
            const insertTranscation = db.prepare(`
                INSERT INTO transaction_histories 
                (from_user_id,to_user_id,currency_id,amount,type,reference_id,created_at)
                VALUES (?,?,?,?,?,?,?)
                `)
            
            const result = insertTranscation.run(obj.from_user_id,obj.to_user_id,obj.currency_id,obj.amount,obj.type,obj.reference_id,obj.created_at)
            const row = result.lastInsertRowid
            const transactionRow = db.prepare(`SELECT * FROM transaction_histories WHERE id = ?`).get(row);
            return(transactionRow)


        } catch (error) {
            return(error)
        }
    }
}
export default Transaction;