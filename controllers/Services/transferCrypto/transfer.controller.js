import Wallet from "../../../models/wallet/Wallet.js";
import WalletBalance from "../../../models/wallet/WalletBalance.js";

//Post api transfer
export async function transferCryptoController(req,res) {
    try {
        const { from_user_id, to_user_id, currency_id, amount} = req.body
        
        if (!from_user_id || !to_user_id || !currency_id || !amount) {
            res.status(400).json({ message: "Missing required fields", feild : {from_user_id,to_user_id,currency_id,amount}})
        }

        const from_wallet = await Wallet.getByUserId(from_user_id);
        const to_wallet = await Wallet.getByUserId(to_user_id)

        if(!from_wallet || !to_wallet) {
            return res.status(404).json({message: "wallet not found", wallet_sender: from_wallet, wallet_reciever: to_wallet})
        }
    
        const from_balance = await WalletBalance.getByWalletAndCurrency(from_wallet.id ,currency_id);
        const to_balance = await WalletBalance.getByWalletAndCurrency(to_wallet.id, currency_id);
       
        if (!from_balance || from_balance.amount < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
          }
        // - balance of sender
        await WalletBalance.decreaseAmount(from_wallet.id, currency_id, amount)

        if(!to_balance) {
            await WalletBalance.add({wallet_id : to_wallet.id, currency_id})
        }

        await WalletBalance.increaseAmount(to_wallet.id, currency_id, amount);
        res.status(200).json({
            message: "Transer successful",
            from_user_id,
            to_user_id,
            currency_id,
            amount
        })

    } catch (error) {
        res.status(500).json({message: 'error while transfer cypto' , error: error})
    }
}