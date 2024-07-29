const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); // Import Firestore instance
const app = express();
const port = 12000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Route to handle form submission
app.post('/api/form', async (req, res) => {
    const {
        monthlyGrossIncome, netIncome, housingCost, utilities, foodAndGroceries, transport, insurance, entertainment,
        healthcare, education, savings, others, totalDebt, repaymentPlans, investment, pfFunds, property, emergencyFunds
    } = req.body;
    
    // Create a unique document ID
    const docId = Date.now().toString(); // Use timestamp as a simple unique ID
    
    try {
        // Store the data in Firestore
        await db.collection('formSubmissions').doc(docId).set({
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
        res.json({ success: true, message: 'Form data received and stored successfully' });
    } catch (error) {
        console.error('Error storing data:', error.message);
        res.status(500).json({ success: false, message: 'Error storing data', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
