const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');

// Creates a wallet
router.post('/create', async (req, res) => {
    const { userName } = req.body;

    // Check if a wallet already exists for this user
    let wallet = await Wallet.findOne({ userName });
    if (wallet) {
        return res.status(400).json({ msg: 'Wallet already exists for this user!' });
    }

    wallet = new Wallet({ userName });
    await wallet.save();
    res.status(201).json(wallet);
});

// Adds money to the wallet
router.post('/add', async (req, res) => {
    const { userName, amount, reason } = req.body;
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
        return res.status(404).json({ msg: 'Wallet Not Found!' });
    }

    wallet.balance += amount;
    wallet.transactions.push({ amount, reason });
    await wallet.save();

    res.json(wallet);
});

// Deducts money from the wallet
router.post('/deduct', async (req, res) => {
    const { userName, amount, reason } = req.body;
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
        return res.status(404).json({ msg: 'Wallet Not Found!' });
    }

    if (wallet.balance < amount) {
        return res.status(400).json({ msg: 'Insufficient balance in wallet!' });
    }

    wallet.balance -= amount;
    wallet.transactions.push({ amount: -amount, reason });
    await wallet.save();

    res.json(wallet);
});

// Get wallet details by userName
router.get('/:userName', async (req, res) => {
    const wallet = await Wallet.findOne({ userName: req.params.userName });
    if (!wallet) {
        return res.status(404).json({ msg: 'Wallet not found' });
    }

    res.json(wallet);
});

module.exports = router;
