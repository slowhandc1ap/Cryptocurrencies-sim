import WalletBalance from "../../models/wallet/WalletBalance.js"

export async function getAllWalletBalanceController(req,res) {
    console.log('getAll')
    try {
        const walletBalances = await WalletBalance.getAll();
        res.status(200).json(walletBalances)
    } catch (error) {
        res.status(500).json({Error : `Erorr while get wallet Balances ${error}`})
    }
}

export async function getWalletBalanceByIdController(req,res) {
    try {
        const id = req.params.walletBalances_id 
        const result = await WalletBalance.getById(id)

        if (!result) {
            return res.status(404).json({message: "Wallet ID not found"})
        }
        res.status(200).json(result)
    } catch (error) {
        
    }
}




export async function addWalletBalanceController(req, res) {
    try {
        const newWallet = req.body;
        if (!req.body.wallet_id || !req.body.currency_id) {
            return res.status(400).json({ message: 'wallet_id and currency_id are required' });
          }
        const result = await WalletBalance.add(newWallet);

        res.status(201).json({ message: 'Wallet Balance created successfully', details: result });
    } catch (error) {
        res.status(500).json({ error: `Error adding wallet balance: ${error.message}` });
    }
}