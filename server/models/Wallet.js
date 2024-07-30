const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    logs: [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = mongoose.model('Wallet', WalletSchema);
