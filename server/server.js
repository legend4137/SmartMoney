const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./routes/middleware');

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
// const { body, validationResult } = require('express-validator');

const { db } = require("./firebase"); // Import Firestore instance
//const {mongoDb} = require("./mongodb")
// Import Google Generative AI SDK

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { Goal } = require("lucide-react");

const app = express();
const port = 12000;
x = 0;

const MongoDB_KEY = process.env.MONGODB_KEY;
const API_KEY_REC = process.env.APIKEY_REC;
const API_KEY_TAX = process.env.APIKEY_TAX;
const API_KEY_UPDATE = process.env.APIKEY_UPDATE;
const API_KEY_DAILY = process.env.APIKEY_DAILY;
const API_KEY_CHATBOT = process.env.APIKEY_CHATBOT;
// MongoDB connection URI
const uri = MongoDB_KEY;
// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

// Import Wallet model
const Wallet = require('./models/Wallet');

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);

module.exports = { Wallet };

app.post("/financialgoals/add",async (req,res)=>{
  const {userName,goalName} = req.body;

  if (!userName || !goalName) {
    return res.status(400).json({ msg: "UserName and GoalName are required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Goal List Not Found!" });
    }

    wallet.goals.push(goalName);

    await wallet.save();

    res.json(wallet);
  } catch (error) {
    console.error("Error adding Goal:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/financialgoals/:userName", async(req,res)=>{
  const { userName } = req.params;

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Goals not found" });
    }

    res.json(wallet.goals);
  } catch (error) {
    console.error("Error fetching GoalList:", error);
    res.status(500).json({ msg: "Server error" });
  }

});

app.post("/financialgoals/remove", async(req,res)=>{
  const { userName, goalNo } = req.body;

  if (!userName || goalNo === undefined) {
    console.log("Missing userName or goalNo");
    return res.status(400).json({ msg: "UserName and goalNo are required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });
    console.log("Found wallet:", wallet);

    if (!wallet) {
      console.log("Wallet not found for user:", userName);
      return res.status(404).json({ msg: "Goal List Not Found!" });
    }

    if (goalNo < 0 || goalNo >= wallet.goals.length) {
      console.log("Invalid goal number:", goalNo);
      return res.status(400).json({ msg: "Invalid goal number!" });
    }

    
    wallet.goals.splice(goalNo, 1);
    await wallet.save();
    console.log("Goal removed successfully");

    res.json({ msg: "Goal removed successfully", goals: wallet.goals });
  } catch (error) {
    console.error("Error removing Goal:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/wallet/create", async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  try {
    const existingWallet = await Wallet.findOne({ userName });
    if (existingWallet) {
      return res
        .status(400)
        .json({ msg: "Wallet already exists for this user!" });
    }

    const wallet = new Wallet({ userName });
    await wallet.save();

    res.status(201).json(wallet);
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/wallet/add", async (req, res) => {
  const { userName, amount } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ msg: "A valid amount is required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet Not Found!" });
    }

    wallet.balance += amount;
    wallet.logs.push({
      amount,
      reason: `Added ${amount} to the wallet!`,
      transaction: "deposit",
      tag: " ",
      logDate: new Date(),
    });

    await wallet.save();

    res.json(wallet);
  } catch (error) {
    console.error("Error adding money:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/wallet/deduct", async (req, res) => {
  const { userName, amount, tag } = req.body;

  if (!userName) {
    return res.status(400).json({ msg: "UserName is required!" });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ msg: "A valid amount is required!" });
  }

  if (!tag) {
    return res.status(400).json({ msg: "Tag and reason are required!" });
  }

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet Not Found!" });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance in wallet!" });
    }

    wallet.balance -= amount;

    wallet.logs.push({
      amount,
      reason: `Deducted ₹${amount} from the wallet!`,
      transaction: "withdraw",
      tag,
      logDate: new Date()
    });

    await wallet.save();

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

    res.json(wallet);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/wallet/:userName/last-deposit", async (req, res) => {
  const { userName } = req.params;

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

  
    const depositLogs = wallet.logs.filter((log) => log.transaction === "deposit");

    if (depositLogs.length === 0) {
      return res.status(404).json({ msg: "No deposit logs found" });
    }

    const lastDepositLog = depositLogs[depositLogs.length - 1];

    res.json(lastDepositLog);
  } catch (error) {
    console.error("Error fetching last deposit log:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/wallet/:userName/last-withdraw", async (req, res) => {
  const { userName } = req.params;

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

    const depositLogs = wallet.logs.filter((log) => log.transaction === "withdraw");

    if (depositLogs.length === 0) {
      return res.status(404).json({ msg: "No withdraw logs found" });
    }

    const lastDepositLog = depositLogs[depositLogs.length - 1];

    res.json(lastDepositLog);
  } catch (error) {
    console.error("Error fetching last deposit log:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/api/form", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    gender,
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

  const docId = userName; 
  const healthScore = 0;
  const alert1 = "";
  const alert2 = "";
  const alert3 = "";
  const dailyrec1 = "";
  const dailyrec2 = "";
  const dailyrec3 = "";
  const dailyrec4 ="";

  try {
    
    const userDoc = await db.collection("formSubmissions").doc(docId).get();
    if (userDoc.exists && x == 0) {
      
      return res.json({
        success: false,
        message: "An account with this username already exists",
      });
    }
    x = x + 1;

    await db.collection("formSubmissions").doc(docId).set({
      firstName,
      lastName,
      age,
      gender,
      email,
      userName,
      monthlyGrossIncome,
      netIncome,
      housingCost,
      utilities,
      healthScore,
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
      alert1,
      alert2,
      alert3,
      dailyrec1,
      dailyrec2,
      dailyrec3,
      dailyrec4
    });

    res.json({
      success: true,
      message: "Form data received and stored successfully",
      docId,
    });
  } catch (error) {
    console.error("Error storing data:", error.message);
    res.status(500).json({
      success: false,
      message: "Error storing data",
      error: error.message,
    });
  }
});

app.get("/handleDuplicates", async (req, res) => {
  const username = req.query.userName;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "Username is required" });
  }

  try {
    const snapshots = await db.collection("formSubmissions").get();
    const existingUsernames = snapshots.docs.map((doc) => doc.id);
    const exists = existingUsernames.includes(username);
    res.json({ exists });
  } catch (error) {
    console.error("Error checking duplicates:", error);
    return res.status(500).json({
      success: false,
      message: "Error checking duplicates",
      error: error.message,
    });
  }
});

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
        My AGE: ${userData.age}
        My gender: ${userData.gender}
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
      max_tokens: 150, 
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
  console.log(req.query.userName);
  const user = req.query.userName;
  const genAI = new GoogleGenerativeAI(
    API_KEY_REC
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I am making a website which gives financial advices and acts as a budget planner called SmartMoney." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to hear about SmartMoney. What would you like me to do?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  const userdoc = await db
    .collection("formSubmissions")
    .doc(req.query.userName)
    .get();

  const doc = userdoc._fieldsProto;
  try {
    if (userdoc.exists) {
      console.log("exists");
      const prompt = `I am making a website. there  a component of financial score. I want to calculate a hypothetical financial score where 0 means the worst and 100 means best. consider any metics as you want for determining it. I will provide you with some of the data.. Do any criteria you want to consider just provide me with a fixed number.Don't chnage the number for same response. I dont want any text as a output just give me a number
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
  -totalDebt:${parseFloat(doc.totalDebt.stringValue)},
  -repaymentPlans:${doc.repaymentPlans.stringValue},
  -investment:${doc.investment.stringValue},
  -pfFunds:${doc.pfFunds.stringValue},
  -property:${doc.property.stringValue},
  -emergencyFunds:${doc.emergencyFunds.stringValue
        }  It some of the entires are not there just dont consider them.If you counter some null values change the criteria accordingly so that you are able to determine the score. Do any manupulatins you want just give me the score. dont include any # while giving the number.I just want one single number.do not include any bold words in the response.
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
      const points = text2.split('\n');
      const point1 = points[0];
      const point2 = points[1];
      const point3 = points[2];
      document = db.collection("formSubmissions").doc(user);
      await document.update({
        healthScore: text,
        alert1: point1,
        alert2: point2,
        alert3: point3
      });
      const pass = {
        number: text,
        alert1: point1,
        alert2: point2,
        alert3: point3
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

app.get("/get_account", async (req, res) => {
  try {
    const accountId = req.query.userName;

    if (!accountId) {
      return res.status(400).json({ error: "Account ID is required" });
    }

    const accountDoc = await db
      .collection("formSubmissions")
      .doc(accountId)
      .get();

    if (!accountDoc.exists) {
      return res.status(404).json({ error: "Account not found" });
    }

    const accountData = accountDoc.data();
    res.json({ success: true, data: accountData });
  } catch (error) {
    console.error("Error getting account", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/update_account", async (req, res) => {
  const { accountId } = req.body;
  const updatedData = req.body.updatedData;

  if (!accountId) {
    return res.status(400).json({ error: "Account ID is required" });
  }

  if (!updatedData || typeof updatedData !== "object") {
    return res.status(400).json({ error: "Valid updatedData is required" });
  }

  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "gender",
      "age",
      "monthlyGrossIncome",
      "netIncome",
      "housingCost",
      "utilities",
      "foodAndGroceries",
      "transport",
      "insurance",
      "entertainment",
      "healthcare",
      "education",
      "savings",
      "others",
      "totalDebt",
      "repaymentPlans",
      "investment",
      "pfFunds",
      "property",
      "emergencyFunds",
    ];

    const updateFields = {};

    for (const field of allowedFields) {
      if (field in updatedData) {
        updateFields[field] = updatedData[field];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    await db
      .collection("formSubmissions")
      .doc(accountId)
      .set(updateFields, { merge: true });

    const updatedAccountDoc = await db
      .collection("accounts")
      .doc(accountId)
      .get();
    const updatedAccountData = updatedAccountDoc.data();

    res.json({
      success: true,
      message: "Account updated successfully",
      data: updatedAccountData,
    });
  } catch (error) {
    console.error("Error updating account", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/wallet", async (req, res) => {
  const name = req.query.name;
  const userdoc = await db.collection("formsubmissions").doc(name).get();
  const assest = userdoc._fieldsProto.assest.stringValue;
});

app.get("/tax-rec", async (req, res) => {
  console.log(req.query.userName);
  const user = req.query.userName;
  const genAI = new GoogleGenerativeAI(
    API_KEY_TAX
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
      maxOutputTokens: 500,
    },
  });
  const userdoc = await db
    .collection("formSubmissionstaxes")
    .doc(req.query.userName)
    .get();

  const doc = userdoc._fieldsProto;
  try {
    if (userdoc.exists) {
      console.log("exists");
      console.log(doc.Contribution);
      const prompt = `This is my information:
      -filingStatus : ${doc.filingStatus.stringValue},
-dependents : ${doc.dependents},
-age : ${doc.age},
-freelanceIncome : ${doc.freelanceIncome},
-rentalIncome : ${doc.rentalIncome},
-taxableOtherIncome : ${doc.taxableOtherIncome},
-401Contribution : ${doc.Contribution},
-IRAContribution : ${doc.IRAContribution},
-investmentIncome : ${doc.investmentIncome},
-mortgageInterest : ${doc.mortgageInterest},
-stateIncomeTaxes : ${doc.stateIncomeTaxes},
-salesTaxes : ${doc.salesTaxes},
-propertyTaxes : ${doc.propertyTaxes},
-medicalExpenses : ${doc.medicalExpenses},
-educationExpenses : ${doc.educationExpenses},
-charitableContributions : ${doc.charitableContributions},
-businessExpenses : ${doc.businessExpenses}
Labels for Recommendations:

Income Optimization:
Income Averaging: Strategies to smooth out income fluctuations.
Tax-Efficient Income Planning: Maximizing after-tax income.
Deduction Maximization:
Itemized Deductions: Analyzing and optimizing deductible expenses.
Standard Deduction: Comparing benefits against itemized deductions.
Credit Utilization:
Non-Refundable Credits: Claiming available credits to reduce tax liability.
Refundable Credits: Identifying and claiming credits that can result in a tax refund.
Retirement Planning:
Retirement Savings Contributions: Maximizing contributions to tax-advantaged retirement accounts.
Retirement Withdrawal Strategies: Planning for tax-efficient withdrawals.
Investment Optimization:
Tax-Loss Harvesting: Realizing losses to offset capital gains.
Tax-Efficient Investing: Structuring investments to minimize tax impact.
Expense Management:
Business Expense Optimization: Maximizing deductible business expenses.
Education Expense Planning: Utilizing education-related tax benefits.
Life Event Planning:
Tax Implications of Life Changes: Understanding tax consequences of major life events.
Estate Planning: Considering tax implications for wealth transfer.
Provide detailed recommendations based on the provided data under each label. Don't give any non-useful lines...just give the recommendations under the labels
    It some of the entires are not there just dont consider them.If you counter some null values change the criteria accordingly so that you are able to determine the recommendation. Do any manupulatins you want just give me the recommendation. dont include any # while giving the recommendation.I just want one single number. Do not include ** in text. GIVE VERY SHORT RECOMMENDATIONSS. DONT INCLUDE LONG LINES
  `;

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);

      document = db.collection("formSubmissionstaxes").doc(user);
      await document.update({
        taxes: text
      });
      const pass = {
        number: text
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


app.post("/api/formtaxes", async (req, res) => {
  const {
    userName,
    filingStatus,
    dependents,
    age,
    freelanceIncome,
    rentalIncome,
    taxableOtherIncome,
    Contribution,
    IRAContribution,
    investmentIncome,
    mortgageInterest,
    stateIncomeTaxes,
    salesTaxes,
    propertyTaxes,
    medicalExpenses,
    educationExpenses,
    charitableContributions,
  } = req.body;

  const docId = userName; 

  try {
    const userDoc = await db.collection("formSubmissionstaxes").doc(docId).get();
    if (userDoc.exists && x == 0) {
      
      return res.json({
        success: false,
        message: "An account with this username already exists",
      });
    }
    x = x + 1;

    await db.collection("formSubmissionstaxes").doc(docId).set({
      userName,

      filingStatus,
    dependents,
    age,
    freelanceIncome,
    rentalIncome,
    taxableOtherIncome,
    Contribution,
    IRAContribution,
    investmentIncome,
    mortgageInterest,
    stateIncomeTaxes,
    salesTaxes,
    propertyTaxes,
    medicalExpenses,
    educationExpenses,
    charitableContributions,
    });

    res.json({
      success: true,
      message: "Form data received and stored successfully",
      docId,
    });
  } catch (error) {
    console.error("Error storing data:", error.message);
    res.status(500).json({
      success: false,
      message: "Error storing data",
      error: error.message,
    });
  }
});

app.get("/health-rec-update", async (req, res) => {
  const new_data = req.body;

  const userdoc = await db
    .collection("formSubmissions")
    .doc(new_data.userName)
    .get();
  const doc = userdoc._fieldsProto;

  const old_data = {
    gender: doc.gender.stringValue,
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
    
    if (old_data[key] !== new_data[key]) {
      const flag = true;
    }
  }
  const flag = false;
  try {
    if (flag == true) {
      const genAI = new GoogleGenerativeAI(
        API_KEY_UPDATE
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
      -my Gender: ${doc.gender.stringValue},
      -my age: ${doc.age.stringValue},
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
      await db
        .collection("formSubmissions")
        .doc(old_data.userName)
        .set(healthScore);
      const doc_ref = db.collection("formSubmissions").doc(old_data.userName);
      doc_ref.update({
        healthScore: text,
      });

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
});

app.get("/daily-rec", async (req, res) => {
  const advice = [''];
  const userName = req.query.userName;

  try {
    const wallet = await Wallet.findOne({ userName });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }
    
    const log = wallet.logs;
    

    const type = {
      Entertainment: 0,
      Medical: 0,
      Education: 0,
      Food_n_Drink: 0,
      Utils: 0,
      Home: 0,
      Uncategorized: 0,
      Transportation: 0,
    };
    
    for (let i = 0; i < log.length && i < 100; i++) {
      if (log[i].transaction == "withdraw") {
        const event = log[i].tag;
        type[event] += log[i].amount;
      }
    }
    const genAI = new GoogleGenerativeAI(
      API_KEY_DAILY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    prompt = `I am building a finance advisor website. One of its feature is of advices. The user data is given to me. I want to give him some suggestions that will be based on the analysis of his expenditure. I will give you his daily expenses. On the basis of them give me 4 advices. The advices should be crisp and give them in bullet point. Just give me 4 bullet points of Advices. DO not give any other texts in writing.
       Entertainment :  ${type.Entertainment},
       Medical:${type.Medical},
       Education: ${type.Education},
      Food_n_Drink : ${type.Food_n_Drink},     
      Utils : ${type.Utils},
      Home : ${type.Home},
      Uncategorized : ${type.Uncategorized},    
      Transportation : ${type.Transportation}`;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    const points = text.split('\n');
    const point1 = points[0];
    const point2 = points[1];
    const point3 = points[2];
    const point4 = points[3];
    document = db.collection("formSubmissions").doc(userName);

    await document.update({
      dailyrec1: point1 || '',
      dailyrec2: point2 || '',
      dailyrec3: point3 || '',
      dailyrec4: point4 || '',
    });

    const pass = {
      rec1: point1 || '',
      rec2: point2 || '',
      rec3: point3 || '',
      rec4: point4 || '',
    };

    await document.update({
      dailyrec1: point1,
      dailyrec2: point2,
      dailyrec3: point3,
      dailyrec4: point4
    })
    res.json(pass);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/wallet-card", async (req, res) => {
  const userName = req.query.userName;
  console.log(`Received request for userName: ${userName}`); 
  try {
    
    const userDoc = await db.collection("formSubmissions").doc(userName).get();
    let firestoreData = {};
    if (userDoc.exists) {
      firestoreData = userDoc.data();
    } else {
      return res.status(404).json({ error: "User not found in Firestore" });
    }

    
    const mongoData = await Wallet.findOne({ userName });
    if (!mongoData) {
      return res.status(404).json({ error: "User not found in MongoDB" });
    }

    let latestPositiveLog = null;
    let latestNegativeLog = null;

    mongoData.logs.forEach((log) => {
      if (log.transaction === "deposit") {
        if (
          !latestPositiveLog ||
          new Date(log.logDate) > new Date(latestPositiveLog.logDate)
        ) {
          latestPositiveLog = log;
        }
      } else if (log.transaction === "withdraw") {
        if (
          !latestNegativeLog ||
          new Date(log.logDate) > new Date(latestNegativeLog.logDate)
        ) {
          latestNegativeLog = log;
        }
      }
    });

    const combinedData = {
      ...firestoreData,
      posamount: latestPositiveLog ? latestPositiveLog.amount : 0,
      negamount: latestNegativeLog ? latestNegativeLog.amount : 0,
      balance: mongoData.balance || 0, 
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/scrolling", async (req, res) => {
  const userName = req.query.userName;
  console.log(`Received request for userName: ${userName}`); 

  try {
    
    const mongoData = await Wallet.findOne({ userName });
    if (!mongoData) {
      return res.status(404).json({ error: "User not found in MongoDB" });
    }

    const sortedLogs = mongoData.logs.sort(
      (a, b) => new Date(b.logDate) - new Date(a.logDate)
    );

    const latestLogs = sortedLogs.slice(0, 100);

    const logs = {};
    latestLogs.forEach((log, index) => {
      logs[`log${index + 1}`] = {
        amount: log.amount,
        reason: log.reason,
        transaction: log.transaction,
        tag: log.tag,
        Date: log.logDate,
      };
    });

    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/chatbot-", async (req, res) => {
  console.log(req.body);
  const context = req.body.context;
  console.log(req.body.userName);
  const userName = req.body.userName;
  const userdoc = await db
    .collection("formSubmissions")
    .doc(req.body.userName)
    .get();
  const doc = userdoc._fieldsProto;

  const mongoData = await Wallet.findOne( {userName} );
  if (!mongoData) {
    return res.status(404).json({ error: "User not found in MongoDB" });
  }

  console.log(mongoData.balance);
  

  const old_data = {
    gender: doc.gender.stringValue,
    age: doc.age.stringValue,
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

  console.log(context);
  try{
  const genAI = new GoogleGenerativeAI(
    API_KEY_CHATBOT
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    
    generationConfig: {
      maxOutputTokens: 500,
    },
  })
  const prompt = req.body.prompt;
  
  const acctual_prompt = ` you are a financial advisor. this is some of the data of me study it appropriately 
  -my age: ${doc.age.stringValue},
  -my gender: ${doc.gender.stringValue},
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
  -emergencyFunds:${doc.emergencyFunds.stringValue},
  -my current balance: ${mongoData.balance},
  -my future goals are: ${mongoData.goals}
  -my last transactions are this: ${mongoData.logs} In the follwing lines I will give you some conversation${JSON.stringify(context)}.If there was a null in the privious line consider no conversation happerned and advice to my next sentance accordingly , otherwise study the conversations and respond to next sentence accordingly , do not include any bold words in the response
  . ${JSON.stringify(prompt)}.`;
  console.log(acctual_prompt);
  const result = await chat.sendMessage(acctual_prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    const pass = {
      response: text
    };
    res.json(pass);
  }
  catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ msg: "Server error" });
  }
});