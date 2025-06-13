import db from "../../config/storage.js";
import Wallet from "../wallet/Wallet.js";
import WalletBalance from "../wallet/WalletBalance.js";
class Withdrawals {
    constructor({id,user_id,currency_id,target_address,amount,fee,status,created_at}){
        this.id = id,
        this.user_id = user_id,
        this.currency_id = currency_id, 
        this.target_address = target_address,
        this.amount = amount,
        this.fee = fee || 5,
        this.status = status || 'pending',
        this.created_at = created_at || new Date().toISOString()
    }

    static async  moneyOut (withDrawObj) {
        const {id,user_id,currency_id,target_address,amount,fee,status,created_at} = withDrawObj
        const wallet = await Wallet.getByUserId(user_id)
      
        if (!wallet) throw new Error('User Wallet not found')
        const wallet_id = wallet.id;

        const checkBalance = await WalletBalance.getByWalletAndCurrency(wallet_id, currency_id)
        console.log(checkBalance)

        if(!checkBalance){
            throw new Error('Wallet Balance not found')
        }
        // save withdrawals
        const insertWithdraw = db.prepare(`
                INSERT INTO withdrawals (user_id,currency_id,target_address,amount,fee,status) 
                
                VALUES (?,?,?,?,?,?)
            `)
        insertWithdraw.run(user_id,currency_id,target_address,amount,fee,'confirmed')

        const updateBalance = await WalletBalance.decreaseAmount(wallet_id,currency_id,amount)
        return({withDrawObj , updateBalance})
        
    }
}

export default Withdrawals;