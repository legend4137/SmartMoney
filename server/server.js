const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { db } = require('./firebase'); // Import Firestore instance
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import Google Generative AI SDK

const app = express();
const port = 12000;

// MongoDB connection URI
const uri = 'mongodb+srv://b23bb1020:ntrAY6AlkcRSglSg@smartmoney.h8do5k0.mongodb.net/wallet?retryWrites=true&w=majority&appName=SmartMoney';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas:', err));

// Initialize Google Generative AI client
const gemini = new GoogleGenerativeAI({
  apiKey: 'AIzaSyBt_v5abOVdWQXYukxRbDp6iT3KLLOUaz4' // Your actual Gemini API key
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());

// Enable CORS
app.use(cors());

// Define schema and model for wallet
const walletSchema = new mongoose.Schema({
  balance: { type: Number, required: true, default: 0 },
  logs: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now }
});

const Wallet = mongoose.model('Wallet', walletSchema);

// Route to handle form submission (Firestore)
app.post('/api/form', async (req, res) => {
  const {
    firstName, lastName, email, userName, monthlyGrossIncome, netIncome, housingCost, utilities, foodAndGroceries, transport, insurance, entertainment,
    healthcare, education, savings, others, totalDebt, repaymentPlans, investment, pfFunds, property, emergencyFunds
  } = req.body;

  const docId = userName; // Use timestamp as a simple unique ID

  try {

        if (!docId) {
            return console.log("error");
          }
    await db.collection('formSubmissions').doc(docId).set({
            firstName,
            lastName,
            email,
            userName,
      monthlyGrossIncome,
      netIncome,
      housingCost,
      utilities,
      foodAndGroceries,
      transport,
      insurance,
      entertainment,
      healthcare,
      education,
      savings,
      others,
      totalDebt,
      repaymentPlans,
      investment,
      pfFunds,
      property,
      emergencyFunds
    });

    res.json({ success: true, message: 'Form data received and stored successfully', docId });
  } catch (error) {
        console.log("Error here");
    console.error('Error storing data:', error.message);
    res.status(500).json({ success: false, message: 'Error storing data', error: error.message });
  }
});

app.get('/handleDuplicates', async (req, res) => {
    const username = req.query.userName;
    
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    
    try {
        const userDoc = await db.collection('formSubmissions').doc(username).get();
        if(userDoc.exists){
            res.json({exists:false})
        }
        else{
            res.join({exists:true})
        }
    } catch (error) {
      console.error('Error checking duplicates:', error);
      return res.status(500).json({ success: false, message: 'Error checking duplicates', error: error.message });
    }
  });

// Route to get user information by document ID (Firestore)
app.get('/api/get/user/:docId', async (req, res) => {
  const docId = req.params.docId;

  try {
    const userDoc = await db.collection('formSubmissions').doc(docId).get();

    if (!userDoc.exists) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({ success: true, data: userDoc.data() });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching user data', error: error.message });
  }
});

// Route to generate alerts based on user data using Gemini API
app.post('/api/get/alerts', async (req, res) => {
  const { docId } = req.body;

  try {
    const userDoc = await db.collection('formSubmissions').doc(docId).get();

    if (!userDoc.exists) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const userData = userDoc.data();

    const payload = {
      prompt: `
        Given the following financial information, generate an alert:
        Monthly Gross Income: ${userData.monthlyGrossIncome}
        Net Income: ${userData.netIncome}
        Housing Cost: ${userData.housingCost}
        Utilities: ${userData.utilities}
        Food and Groceries: ${userData.foodAndGroceries}
        Transport: ${userData.transport}
        Insurance: ${userData.insurance}
        Entertainment: ${userData.entertainment}
        Healthcare: ${userData.healthcare}
        Education: ${userData.education}
        Savings: ${userData.savings}
        Others: ${userData.others}
        Total Debt: ${userData.totalDebt}
        Repayment Plans: ${userData.repaymentPlans}
        Investment: ${userData.investment}
        PF Funds: ${userData.pfFunds}
        Property: ${userData.property}
        Emergency Funds: ${userData.emergencyFunds}

        Based on this information, provide a financial alert or recommendation.
      `,
      max_tokens: 150, // Adjust as needed
    };

    const response = await gemini.generateContent({
      model: 'gemini-1.5-flash-latest',
      prompt: payload.prompt,
      max_tokens: payload.max_tokens,
    });

    const alertMessage = response.data.choices[0].message.content.trim();

    res.status(200).json({ success: true, alert: alertMessage });
  } catch (error) {
    console.error('Error creating alert:', error.message);
    res.status(500).json({ success: false, message: 'Error creating alert', error: error.message });
  }
});

// Wallet API routes
app.post('/wallet/create', async (req, res) => {
  const wallet = new Wallet();
  await wallet.save();
  res.status(201).json(wallet);
});

app.post('/wallet/add', async (req, res) => {
  const { walletId, amount } = req.body;
  const wallet = await Wallet.findById(walletId);

  if (!wallet) {
    return res.status(404).json({ msg: 'Wallet Not Found!' });
  }

  wallet.balance += amount;
  wallet.logs.push(`Added ${amount} to the wallet!`);
  await wallet.save();

  res.json(wallet);
});

app.post('/wallet/deduct', async (req, res) => {
  const { walletId, amount } = req.body;
  const wallet = await Wallet.findById(walletId);

  if (!wallet) {
    return res.status(404).json({ msg: 'Wallet Not Found!' });
  }

  if (wallet.balance < amount) {
    return res.status(400).json({ msg: 'Insufficient balance in wallet!' });
  }

  wallet.balance -= amount;
  wallet.logs.push(`Deducted ${amount} from the wallet!`);
  await wallet.save();

  res.json(wallet);
});

app.get('/wallet/:id', async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);
  if (!wallet) {
    return res.status(404).json({ msg: 'Wallet not found' });
  }

  res.json(wallet);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
