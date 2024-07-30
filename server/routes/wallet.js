const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');

//creates a wallet
router.post('/create',async(req,res)=>{
    const wallet = new Wallet();
    await wallet.save();
    res.status(201).json(wallet);
});

//adds money
router.post('/add',async(req,res)=>{
    const {walletId,amount} = req.body;
    const wallet = await Wallet.findById(walletId);

    if(!wallet){
        return res.status(404).json({msg: 'Wallet Not Found !'});
    }

    wallet.balance += amount;
    wallet.logs.push(`Added ${amount} to the wallet !`);
    await wallet.save();

    res.json(wallet);
});

//deducts money
router.post('/deduct',async(req,res)=>{
    const {walletId,amount} = req.body;
    const wallet = await Wallet.findById(walletId);

    if(!wallet){
        return res.status(404).json({msg: 'Wallet Not Found !'});
    }

    if(wallet.balance < amount){
        return res.status(400).json({msg: 'Insufficient balance in wallet !'});
    }

    wallet.balance -= amount;
    wallet.logs.push(`Deducted ${amount} from the wallet !`);
    await wallet.save();

    res.json(wallet);
});

//get wallet
router.get('/:id', async(req,res)=>{
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet){
        return res.status(404).json({ msg: 'Wallet not found' });
    }

  res.json(wallet);
});

module.exports = router;
