
import Currencies from "../../models/currencies/Currencies.js"

export async function getAllCurrenciesController(req, res) {
    try {
        const result = await Currencies.getAll()
        res.json(result)
    } catch (error) {
        res.status(500).json({message : `Error while get All Currencies : ${error}`})
    }
   
}

export async function getCurrenciesByid(req,res) {
    
    try {
        
        const currencies = await Currencies.findById(req.params.currencies_id)
        if (!currencies) {
            return (res.status(404).json({message : 'Cannot find currencies'}))
        }
        res.json(currencies)
    } catch (error) {
        res.status(500).json({message : `Error while get Currencies By id : ${error}`})
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

export async function updateCurencies(req,res) {

    try {
        
        const currencies_id = req.params.currencies_id
        const currencies = req.body
        const updateCurencies = {
            id : currencies_id,
            ...currencies
        }
        const result = await Currencies.update(updateCurencies)
 
        if (!result) {
            return (res.status(404).json({message : 'Cannot find currencies'}))
        }
        res.status(200).json({message : 'Update Currencies successfully', Details : updateCurencies})
    } catch (error) {
        res.status(500).json({message : `Error while Update Currencies : ${error}`})
    }
}


export async function delteCurrenciesController(req,res) {
    
    try {
        const id = req.params.currencies_id
        const result = await Currencies.delete(id)
        if (result === 0) {
            return res.status(404).json({ message: "Cannot find currencies with that ID" });
        }
        res.status(200).json({message: "delete currencies ", Details : result})
    } catch (error) {
        res.status(500).json({message : "Error While Delete Currencies" , ID : error})
    }
}

