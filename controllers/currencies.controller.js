// import User from '../models/User.js';

// export async function getAllUsers() {
//   return User.getAll();
// }

// export async function addUser(userData) {
//   const user = new User(userData);
//   User.add(user);
// }
// export async function deleteUser(user_id) {
//   return User.delete();
// }
import Currencies from "../models/Currencies.js";

export async function getAllCurrenciesController(req, res) {
    try {
        const result = await Currencies.getAll()
        res.json(result)
    } catch (error) {
        res.status(500).json({message : `Error while get All Currencies : ${error}`})
    }
   
}

export async function addCurrenciesController(req,res) {
    try {
        const currenciesData = req.body;
        const currencies = new Currencies(currenciesData);
        const result = await Currencies.add(currencies)
        res.status(201).json({ message: "Add new Currencies Successfully " , Details : result});
    } catch (error) {
        res.status(500).json({message : `Error while Create Currencies ${error}`})
    }
}

