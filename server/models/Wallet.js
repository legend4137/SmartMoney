const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    Reason:{
        type:String,
        required:true
    },
    logs: [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = mongoose.model('Wallet', WalletSchema);
