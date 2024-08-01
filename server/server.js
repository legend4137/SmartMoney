const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
// import Realm, { ObjectSchema } from "realm";
const bodyParser = require("body-parser");
const { db } = require("./firebase"); // Import Firestore instance
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Import Google Generative AI SDK

const app = express();
const port = 12000;
x=0

// MongoDB connection URI
const uri =
  "mongodb+srv://b23mt1007:mDyT1vJyK8kEWykM@cluster0.0ilb9tn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

// Initialize Google Generative AI client
const gemini = new GoogleGenerativeAI({
  apiKey: "AIzaSyBt_v5abOVdWQXYukxRbDp6iT3KLLOUaz4", // Your actual Gemini API key
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());

// Enable CORS
app.use(cors());

// Define schema and model for wallet
const walletSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true }, 
  userName: { type: String, required: true, unique: true }, 
  balance: { type: Number, required: true, default: 0 },
  logs: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});


const Wallet = mongoose.model("Wallet", walletSchema);

app.post("/wallet/create", async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  try {
    // Check if a wallet with the same username already exists
    const existingWallet = await Wallet.findOne({ userName });
    if (existingWallet) {
      return res.status(400).json({ msg: "Wallet already exists for this user!" });
    }

    // Create a new wallet with the provided username
    const wallet = new Wallet({ userName });
    await wallet.save();

    res.status(201).json(wallet);
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
app.post("/wallet/create", async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  try {
    // Check if a wallet with the same username already exists
    const existingWallet = await Wallet.findOne({ userName });
    if (existingWallet) {
      return res.status(400).json({ msg: "Wallet already exists for this user!" });
    }

    // Create a new wallet with the provided username
    const wallet = new Wallet({ userName });
    await wallet.save();

    res.status(201).json(wallet);
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
});



app.get("/test", (req, res) => {
  res.send("Server is running!");
});

app.post("/wallet/add", async (req, res) => {
  const { userName, amount } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });
  const { userName, amount } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet Not Found!" });
    }
    if (!wallet) {
      return res.status(404).json({ msg: "Wallet Not Found!" });
    }

    wallet.balance += amount;
    wallet.logs.push(`Added ${amount} to the wallet!`);
    await wallet.save();
    wallet.balance += amount;
    wallet.logs.push(`Added ${amount} to the wallet!`);
    await wallet.save();

    res.json(wallet);
  } catch (error) {
    console.error("Error adding money:", error);
    res.status(500).json({ msg: "Server error" });
  }
    res.json(wallet);
  } catch (error) {
    console.error("Error adding money:", error);
    res.status(500).json({ msg: "Server error" });
  }
});



app.post("/wallet/deduct", async (req, res) => {
  const { userName, amount } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });
  const { userName, amount } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet Not Found!" });
    }
    if (!wallet) {
      return res.status(404).json({ msg: "Wallet Not Found!" });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance in wallet!" });
    }
    if (wallet.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance in wallet!" });
    }

    wallet.balance -= amount;
    wallet.logs.push(`Deducted ${amount} from the wallet!`);
    await wallet.save();
    wallet.balance -= amount;
    wallet.logs.push(`Deducted ${amount} from the wallet!`);
    await wallet.save();

    res.json(wallet);
  } catch (error) {
    console.error("Error deducting money:", error);
    res.status(500).json({ msg: "Server error" });
  }
    res.json(wallet);
  } catch (error) {
    console.error("Error deducting money:", error);
    res.status(500).json({ msg: "Server error" });
  }
});



app.get("/wallet/:userName", async (req, res) => {
  const { userName } = req.params;

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }
app.get("/wallet/:userName", async (req, res) => {
  const { userName } = req.params;

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

    res.json(wallet);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
});




// Route to handle form submission (Firestore)
app.post("/api/form", async (req, res) => {
  const {
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
    emergencyFunds,
  } = req.body;

  const docId = userName; // Use timestamp as a simple unique ID

  class Task extends Realm.Object {
    static schema = {
      name: "Task",
      properties: {
        _id: "int",
        name: "string",
        status: "string?",
        owner_id: "string?",
      },
      primaryKey: "_id",
    };
  }

  const realm = await Realm.open({
    schema: [Task],
  });

  const allTasks = realm.objects(Task);

  // Add a couple of Tasks in a single, atomic transaction.
  realm.write(() => {
    realm.create(Task, {
      _id: 1,
      name: "go grocery shopping",
      status: "Open",
    });

    realm.create(Task, {
      _id: 2,
      name: "go exercise",
      status: "Open",
    });
  });

  const task1 = allTasks.find((task) => task._id == 1);
  const task2 = allTasks.find((task) => task._id == 2);

  const express = require("express");
  require("dotenv").config();
  const cors = require("cors");
  const mongoose = require("mongoose");
  const Realm = require("realm"); // Corrected import for Realm in JavaScript
  const bodyParser = require("body-parser");
  const { db } = require("./firebase"); // Import Firestore instance
  const { GoogleGenerativeAI } = require("@google/generative-ai"); // Import Google Generative AI SDK

  const app = express();
  const port = 12000;

  // MongoDB connection URI
  const uri =
    "mongodb+srv://b23mt1007:mDyT1vJyK8kEWykM@cluster0.0ilb9tn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  // Connect to MongoDB
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

  // Initialize Google Generative AI client
  const gemini = new GoogleGenerativeAI({
    apiKey: "AIzaSyBt_v5abOVdWQXYukxRbDp6iT3KLLOUaz4", // Your actual Gemini API key
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
    createdAt: { type: Date, default: Date.now },
  });

  const Wallet = mongoose.model("Wallet", walletSchema);
    res.json(wallet);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
});




  // Route to handle form submission (Firestore)
  app.post("/api/form", async (req, res) => {
    const {
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
      emergencyFunds,
    } = req.body;

  
    const docId = userName; // Use timestamp as a simple unique ID
    try{
      // Check if document already exists
      const userDoc = await db.collection('formSubmissions').doc(docId).get();
      if (userDoc.exists && x==0) {
        // If the document exists, send an alert message
        return res.json({ success: false, message: 'An account with this username already exists' });
      }
      x=x+1
  
      // Create a new document if it does not exist
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
        emergencyFunds,
       });
  
      res.json({ success: true, message: 'Form data received and stored successfully', docId });
    } catch (error) {
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
      const snapshots = await db.collection('formSubmissions').get();
      const existingUsernames = snapshots.docs.map(doc => doc.id);
      const exists = existingUsernames.includes(username);
      res.json({ exists });
    } catch (error) {
      console.error('Error checking duplicates:', error);
      return res.status(500).json({ success: false, message: 'Error checking duplicates', error: error.message });
    }
  });
  


// Route to get user information by document ID (Firestore)
app.get("/api/get/user/:docId", async (req, res) => {
  const docId = req.params.docId;

  try {
    const userDoc = await db.collection("formSubmissions").doc(docId).get();

    if (!userDoc.exists) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.json({ success: true, data: userDoc.data() });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message,
    });
  }
});

// Route to generate alerts based on user data using Gemini API
app.post("/api/get/alerts", async (req, res) => {
  const { docId } = req.body;

  try {
    const userDoc = await db.collection("formSubmissions").doc(docId).get();

    if (!userDoc.exists) {
      res.status(404).json({ success: false, message: "User not found" });
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
      model: "gemini-1.5-flash-latest",
      prompt: payload.prompt,
      max_tokens: payload.max_tokens,
    });

    const alertMessage = response.data.choices[0].message.content.trim();

    res.status(200).json({ success: true, alert: alertMessage });
  } catch (error) {
    console.error("Error creating alert:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating alert",
      error: error.message,
    });
  }
});

// Wallet API routes
app.post("/wallet/create", async (req, res) => {
  const wallet = new Wallet();
  await wallet.save();
  res.status(201).json(wallet);
});

app.post("/wallet/add", async (req, res) => {
  const { walletId, amount } = req.body;
  const wallet = await Wallet.findById(walletId);

  if (!wallet) {
    return res.status(404).json({ msg: "Wallet Not Found!" });
  }

  wallet.balance += amount;
  wallet.logs.push(`Added ${amount} to the wallet!`);
  await wallet.save();

  res.json(wallet);
});

app.post("/wallet/deduct", async (req, res) => {
  const { walletId, amount } = req.body;
  const wallet = await Wallet.findById(walletId);

  if (!wallet) {
    return res.status(404).json({ msg: "Wallet Not Found!" });
  }

  if (wallet.balance < amount) {
    return res.status(400).json({ msg: "Insufficient balance in wallet!" });
  }

  wallet.balance -= amount;
  wallet.logs.push(`Deducted ${amount} from the wallet!`);
  await wallet.save();

  res.json(wallet);
});

app.get("/wallet/:id", async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);
  if (!wallet) {
    return res.status(404).json({ msg: "Wallet not found" });
  }

  res.json(wallet);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/health-rec", async (req, res) => {
  console.log(req.body.userName);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBtuZOsDwsnL25GcAsCGI7VFHpbauWkMxk"
  );
app.get("/health-rec", async (req, res) => {
  console.log(req.body.userName);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBtuZOsDwsnL25GcAsCGI7VFHpbauWkMxk"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  const userdoc = await db
    .collection("formSubmissions")
    .doc(req.body.userName)
    .doc(req.body.userName)
    .get();

  const doc = userdoc._fieldsProto;
  try {
    if (userdoc.exists) {
      console.log("exists");
      const prompt = `I am making a website. there  a component of financial socre. I want to calculate a hypothetical financial score where 0 means the worst and 100 means best. consider any metics as you want for determining it. I will provide you with some of the data.. Do any criteria you want to consider just provide me with a fixed number.Don't chnage the number for same response. I dont want any text as a output just give me a number
      const prompt = `I am making a website. there  a component of financial socre. I want to calculate a hypothetical financial score where 0 means the worst and 100 means best. consider any metics as you want for determining it. I will provide you with some of the data.. Do any criteria you want to consider just provide me with a fixed number.Don't chnage the number for same response. I dont want any text as a output just give me a number
      I will give you  the criteria from which you can decide how to judge the number.
      these are the citeria under which you can judge the number
      Income and Expenses (50 points)
Monthly Gross Income: 10 points (scaled based on national average)
Net Income: 10 points (scaled based on national average)
Housing Cost: -5 points (capped at -10 points)
Utilities: -3 points (capped at -5 points)
Food and Groceries: -5 points (capped at -10 points)
Transport: -3 points (capped at -5 points)
Insurance: -2 points (capped at -4 points)
Entertainment: -1 point (capped at -2 points)
Healthcare: -2 points (capped at -4 points)
Education: -2 points (capped at -4 points)
Savings and Investments (30 points)
Savings: 5 points (scaled based on monthly income)
Emergency Funds: 5 points (scaled based on monthly expenses)
Investment: 5 points (scaled based on total income)
PF Funds: 5 points (scaled based on salary)
Property: 10 points (scaled based on property value)
Debt and Financial Responsibility (20 points)
Total Debt: -10 points (scaled based on income)
Repayment Plans: 5 points (if present)
Others: -5 points (general category for other debts)
consider all the amounts in indian ruppees
this citeria provided is not regid you might encounter some empty values adjust the criteria accordingly to give me the score.
some of the values might be null just omit them and try to calculate the score on the basis of the data provided

this citeria provided is not regid you might encounter some empty values adjust the criteria accordingly to give me the score.
some of the values might be null just omit them and try to calculate the score on the basis of the data provided

      -monthlyGrossIncome : ${doc.monthlyGrossIncome.stringValue},
  -netIncome : ${doc.netIncome.stringValue},
  -housingCost : ${doc.housingCost.stringValue},
  -utilities : ${doc.utilities.stringValue},
  -foodAndGroceries : ${doc.foodAndGroceries.stringValue},
  -transport : ${doc.transport.stringValue},
  -insurance : ${doc.insurance.stringValue},
  -entertainment : ${doc.entertainment.stringValue},
  -healthcare : ${doc.healthcare.stringValue},
  -education : ${doc.education.stringValue},
  -savings : ${doc.savings.stringValue},
  -others:${doc.others.stringValue},
  -totalDebt:${doc.totalDebt.stringValue},
  -repaymentPlans:${doc.repaymentPlans.stringValue},
  -investment:${doc.investment.stringValue},
  -pfFunds:${doc.pfFunds.stringValue},
  -property:${doc.property.stringValue},
  -emergencyFunds:${doc.emergencyFunds.stringValue}  It some of the entires are not there just dont consider them.If you counter some null values change the criteria accordingly so that you are able to determine the score. Do any manupulatins you want just give me the score. dont include any # while giving the number.I just want one single number
  -emergencyFunds:${doc.emergencyFunds.stringValue}  It some of the entires are not there just dont consider them.If you counter some null values change the criteria accordingly so that you are able to determine the score. Do any manupulatins you want just give me the score. dont include any # while giving the number.I just want one single number
  `;

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);

      const prompt2 = `give me the 3 short and crisp advices for the health score i got from you to improve my health score only 3 advices nothing else`;
      const result2 = await chat.sendMessage(prompt2);
      const response2 = await result2.response;
      const text2 = response2.text();
      console.log(text2);
      const doc_ref = db.collection("formSubmissions").doc(req.body.userName);
      doc_ref.update({
        healthScore: text
      })

      const doc_ref = db.collection("formSubmissions").doc(req.body.userName);
      doc_ref.update({
        healthScore: text
      })

      const pass = {
        number: text,
        text: text2,
      };
        number: text,
        text: text2,
      };
      res.json(pass);
    } else {
      console.log("No such Document");
      return;
    }
  } catch (error) {
    console.log("Error getting the document", error);
  }
});

app.get('/get_account', async (req, res) => {
  try {
    const accountId = req.query.userName;

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    const accountDoc = await db.collection("formSubmissions").doc(accountId).get();

    if (!accountDoc.exists) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const accountData = accountDoc.data();
    res.json({ success: true, data: accountData });
  } catch (error) {
    console.error('Error getting account', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/update_account', async (req, res) => {
  const { accountId, updatedData } = req.body;

  if (!accountId) {
    return res.status(400).json({ error: 'Account ID is required' });
  }

  if (!updatedData || typeof updatedData !== 'object') {
    return res.status(400).json({ error: 'Valid updatedData is required' });
  }

  try {
    const allowedFields = [
      'monthlyGrossIncome', 'netIncome',
      'housingCost', 'utilities', 'foodAndGroceries', 'transport', 'insurance',
      'entertainment', 'healthcare', 'education', 'savings', 'others', 'totalDebt',
      'repaymentPlans', 'investment', 'pfFunds', 'property', 'emergencyFunds'
    ];

    const updateFields = {};

    for (const field of allowedFields) {
      if (field in updatedData) {
        updateFields[field] = updatedData[field];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Use .set with merge option to update the document without overwriting it completely
    await db.collection("accounts").doc(accountId).set(updateFields, { merge: true });

    // Fetch the updated document to return
    const updatedAccountDoc = await db.collection("accounts").doc(accountId).get();
    const updatedAccountData = updatedAccountDoc.data();

    res.json({ success: true, message: 'Account updated successfully', data: updatedAccountData });
  } catch (error) {
    console.error('Error updating account', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


});

app.get('/get_account', async (req, res) => {
  try {
    const accountId = req.query.userName;

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    const accountDoc = await db.collection("formSubmissions").doc(accountId).get();

    if (!accountDoc.exists) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const accountData = accountDoc.data();
    res.json({ success: true, data: accountData });
  } catch (error) {
    console.error('Error getting account', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/update_account', async (req, res) => {
  const { accountId, updatedData } = req.body;

  if (!accountId) {
    return res.status(400).json({ error: 'Account ID is required' });
  }

  if (!updatedData || typeof updatedData !== 'object') {
    return res.status(400).json({ error: 'Valid updatedData is required' });
  }

  try {
    const allowedFields = [
      'monthlyGrossIncome', 'netIncome',
      'housingCost', 'utilities', 'foodAndGroceries', 'transport', 'insurance',
      'entertainment', 'healthcare', 'education', 'savings', 'others', 'totalDebt',
      'repaymentPlans', 'investment', 'pfFunds', 'property', 'emergencyFunds'
    ];

    const updateFields = {};

    for (const field of allowedFields) {
      if (field in updatedData) {
        updateFields[field] = updatedData[field];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Use .set with merge option to update the document without overwriting it completely
    await db.collection("accounts").doc(accountId).set(updateFields, { merge: true });

    // Fetch the updated document to return
    const updatedAccountDoc = await db.collection("accounts").doc(accountId).get();
    const updatedAccountData = updatedAccountDoc.data();

    res.json({ success: true, message: 'Account updated successfully', data: updatedAccountData });
  } catch (error) {
    console.error('Error updating account', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/wallet" , async (req , res) =>{
  const name = req.query.name;
  const userdoc = await db.collection('formsubmissions').doc(name).get();
  const assest = userdoc._fieldsProto.assest.stringValue;
  

})

app.get("/health-rec-update", async (req, res) => {
  const new_data = req.body;

  const userdoc = await db
    .collection("formSubmissions")
    .doc(new_data.userName)
    .get();
  const doc = userdoc._fieldsProto;
  
  const old_data = {
    monthlyGrossIncome: doc.monthlyGrossIncome.stringValue,
    netIncome: doc.netIncome.stringValue,
    housingCost: doc.housingCost.stringValue,
    utilities: doc.utilities.stringValue,
    foodAndGroceries: doc.foodAndGroceries.stringValue,
    transport: doc.transport.stringValue,
    insurance: doc.insurance.stringValue,
    entertainment: doc.entertainment.stringValue,
    healthcare: doc.healthcare.stringValue,
    education: doc.education.stringValue,
    savings: doc.savings.stringValue,
    others: doc.others.stringValue,
    totalDebt: doc.totalDebt.stringValue,
    repaymentPlans: doc.repaymentPlans.stringValue,
    investment: doc.investment.stringValue,
    pfFunds: doc.pfFunds.stringValue,
    property: doc.property.stringValue,
    emergencyFunds: doc.emergencyFunds.stringValue,
  };

  for (let key in old_data) {
    // Check if the key also exists in new_data and compare values
    if (old_data[key] !== new_data[key]) {
      
      const flag = true;
    }
  }
  const flag = false;
  try {
    if (flag == true) {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyD__M1hTQ3uZ13DvDUMHSV3GNoPfjCuuIQ"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello, I have 2 dogs in my house." }],
          },
          {
            role: "model",
            parts: [
              { text: "Great to meet you. What would you like to know?" },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      const prompt = `I am making a website. there is a component of financial socre. I want to calculate a hypothetical financial score where 0 means the worst and 100 means best. consider any metics as you want for determining it. I will provide you with some of the data.. Do any criteria you want to consider just provide me with a fixed number.Don't chnage the number for same response. I dont want any text as a output just give me a number
      I will give you  the criteria from which you can decide how to judge the number.
      these are the citeria under which you can judge the number
      Income and Expenses (50 points)
Monthly Gross Income: 10 points (scaled based on national average)
Net Income: 10 points (scaled based on national average)
Housing Cost: -5 points (capped at -10 points)
Utilities: -3 points (capped at -5 points)
Food and Groceries: -5 points (capped at -10 points)
Transport: -3 points (capped at -5 points)
Insurance: -2 points (capped at -4 points)
Entertainment: -1 point (capped at -2 points)
Healthcare: -2 points (capped at -4 points)
Education: -2 points (capped at -4 points)
Savings and Investments (30 points)
Savings: 5 points (scaled based on monthly income)
Emergency Funds: 5 points (scaled based on monthly expenses)
Investment: 5 points (scaled based on total income)
PF Funds: 5 points (scaled based on salary)
Property: 10 points (scaled based on property value)
Debt and Financial Responsibility (20 points)
Total Debt: -10 points (scaled based on income)
Repayment Plans: 5 points (if present)
Others: -5 points (general category for other debts)
consider all the amounts in indian ruppees
this citeria provided is not regid you might encounter some empty values adjust the criteria accordingly to give me the score.
some of the values might be null just omit them and try to calculate the score on the basis of the data provided

      -monthlyGrossIncome : ${doc.monthlyGrossIncome.stringValue},
  -netIncome : ${doc.netIncome.stringValue},
  -housingCost : ${doc.housingCost.stringValue},
  -utilities : ${doc.utilities.stringValue},
  -foodAndGroceries : ${doc.foodAndGroceries.stringValue},
  -transport : ${doc.transport.stringValue},
  -insurance : ${doc.insurance.stringValue},
  -entertainment : ${doc.entertainment.stringValue},
  -healthcare : ${doc.healthcare.stringValue},
  -education : ${doc.education.stringValue},
  -savings : ${doc.savings.stringValue},
  -others:${doc.others.stringValue},
  -totalDebt:${doc.totalDebt.stringValue},
  -repaymentPlans:${doc.repaymentPlans.stringValue},
  -investment:${doc.investment.stringValue},
  -pfFunds:${doc.pfFunds.stringValue},
  -property:${doc.property.stringValue},
  -emergencyFunds:${doc.emergencyFunds.stringValue}  It some of the entires are not there just dont consider them.If you counter some null values change the criteria accordingly so that you are able to determine the score. Do any manupulatins you want just give me the score.
  `;

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);

      const prompt2 = `give me the 3 short and crisp advices for the health score i got from you to improve my health score only 3 advices nothing else`;
      const result2 = await chat.sendMessage(prompt2);
      const response2 = await result2.response;
      const text2 = response2.text();
      console.log(text2);
      await db.collection("formSubmissions").doc(old_data.userName).set(healthScore);
      const doc_ref = db.collection("formSubmissions").doc(old_data.userName);
      doc_ref.update({
        healthScore: text
      })

      const pass = {
        number: text,
        text: text2,
      };
      res.json(pass);
    } else {
      console.log("No change in document");
      return;
    }
  } catch (error) {
    console.log("Error getting the document", error);
  }
  ``;
});
