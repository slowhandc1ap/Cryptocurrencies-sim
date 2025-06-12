import db from "../config/storage.js";
import Wallet from "../models/Wallet.js"

// ingest All wallet 
export async function getAllwallets(req, res) {
    try {
        const wallets = Wallet.getAll();
        res.json(wallets);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch Wallets  : ${err}` })
    }
}

export async function getAllwalletByUserId(req, res) {
    try {
        const { userId } = req.params;
        const wallet = Wallet.getByUserId(userId);
        if (!wallet) {
            return res.status(404).json({ error: "Wallet Not Found " })
        }
        res.json(wallet);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch wallet :${err}` })
    }
}


export async function createWallet(req, res) {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" })
        }

        // เช็คว่า user_id มีอยู่จริงใน table users
        const userStmt = db.prepare('SELECT * FROM users WHERE id = ?');
        const user = userStmt.get(user_id);

        if (!user) {
            return res.status(404).json({ error: "User not found, can't create wallet." });
        }


        const newWallet = new Wallet({ user_id });
        const walletId = Wallet.add(newWallet);

        res.status(201).json({ message: "Wallet Created", wallet_ID: walletId });
    } catch (err) {
        res.status(500).json({ error: `Failed to Creaet Wallet : ${err}` })
    }
}

export async function deleteWallet(req, res) {
    try {
        const { walletId } = req.params; 

        if (!walletId) {
            return res.status(400).json({ error: "Missing user_id" });
        }

        const deletedRows = Wallet.delete(Number(walletId)); 

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Wallet not found" });
        }

        res.status(200).json({ message: `Wallet : ${walletId} deleted successfully` });
    } catch (err) {
        console.error("❌ Delete Wallet Error:", err);
        res.status(500).json({ error: err.message });
    }
}

