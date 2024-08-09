const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema and model for wallet
const walletSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: { type: Date },
  balance: { type: Number, required: true, default: 0 },
  logs: [
    {
      amount: { type: Number, required: true },
      reason: { type: String, required: true },
      transaction: { type: String, required: true },
      tag: { type: String, required: true },
      logDate: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  goals: [{ type: String, required: true }],
});

// Hash password before saving the user model
walletSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create Wallet model
const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
