const express = require("express");
const cors = require("cors");
const { db } = require("./firebase"); // Import Firestore instance
const app = express();
const axios = require("axios");
const port = 12000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS
app.use(cors());
const API_KEY = "AIzaSyDxpPYYP0iC0wc-IvVHzvFk_XuF38Rd2LI";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/dashboard", async (req, res) => {
    console.log(req.query.name);
    
  const userdoc =  await db.collection("formSubmissions").doc(req.query.name).get();
  
const doc = userdoc._fieldsProto;
 try {
    if (userdoc.exists) {
      console.log("exists");
    const prompt = `I am making a website. there is a component of financial socre. I want to calculate a hypothetical financial score where 0 means the worst and 100 means best. consider any metics as you want for determining it. I will provide you with some of the data.. Do any criteria you want to consider just provide me with a number. I dont want any text as a output just give me a number
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
    -emergencyFunds:${doc.emergencyFunds.stringValue} 
    also give me suggestions why that number is coming  give me small sentences related to above data`;

   
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
    } else {
      console.log("No such Document");
      return;
    }
  } catch (error) {
    console.log("Error getting the document", error);
  }

  res.end("Hi there this is from dashboard");
});

// Route to handle form submission
app.post("/api/form", async (req, res) => {
  const {
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

  // Create a unique document ID
  const docId = Date.now().toString(); // Use timestamp as a simple unique ID

  try {
    // Store the data in Firestore
    await db.collection("formSubmissions").doc(docId).set({
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

    // Send a response back to the client
    console.log("Data stored successfully");
    res.json({
      success: true,
      message: "Form data received and stored successfully",
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
// app.post('/api/sendToGemini', async (req, res) => {

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
