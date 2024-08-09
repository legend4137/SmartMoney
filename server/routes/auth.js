const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Wallet = require('../models/Wallet'); // Import from models directory

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user already exists
    let user = await Wallet.findOne({ userName });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user
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

// Authenticate a user and return a JWT
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user exists
    const user = await Wallet.findOne({ userName });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create and return a JWT
    const payload = { userName: user.userName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
