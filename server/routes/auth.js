const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Wallet = require('../models/Wallet');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { userName, password } = req.body;

    let user = await Wallet.findOne({ userName });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new Wallet({
      userName,
      password,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Wallet.findOne({ userName });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userName: user.userName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
