import db from "../../config/storage.js";
import Wallet from "../wallet/Wallet.js";
import WalletBalance from "../wallet/WalletBalance.js";
class Deposits {
    constructor({id,user_id,currency_id,amount,tx_hash,status,create_at}){
        this.id = id,
        this.user_id = user_id,
        this.currency_id = currency_id,
        this.amount = amount,
        this.tx_hash = tx_hash,
        this.status = status || 'pending', 
        this.create_at = create_at || new Date().toISOString()
    }

    static async moneyIn ({user_id, currency_id, amount, tx_hash}) {
        try {
            // find user wallet
            const wallet = await Wallet.getByUserId(user_id);
            if(!wallet) throw new Error('Wallet not found')

            const wallet_id = wallet.id

            //check balance wallet 
            const balance = await WalletBalance.getByWalletAndCurrency(wallet_id, currency_id);

            

            if (!balance){
                await WalletBalance.add({wallet_id,currency_id})
            }

            // save deposit
            const insertDeposit = db.prepare(`
                    INSERT INTO deposits (user_id, currency_id, amount, tx_hash, status) VALUES (?,?,?,?,?)
                `)
            insertDeposit.run(user_id, currency_id, amount, tx_hash, 'confirmed');

            const updateAmount = await WalletBalance.increaseAmount(wallet_id, currency_id, amount);
            console.log(updateAmount)
            return (updateAmount)


        } catch (error) {
            throw new Error(`Deposit Filed : ${error.message}`)
        }
    }
}
export default Deposits