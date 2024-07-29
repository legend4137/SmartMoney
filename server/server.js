const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Route to handle form submission
app.post('/api/form', (req, res) => {
    const { monthlyGrossIncome, netIncome, housingCost, utilities, foodAndGroceries, transport, insurance, entertainment,
        healthcare, education, savings, others, totalDebt, repaymentPlans, investment, pfFunds, property, emergencyFunds } = req.body;
    // Process the form data here
    console.log('Form data received:', { monthlyGrossIncome, netIncome, housingCost, utilities, foodAndGroceries, transport, insurance, entertainment,
        healthcare, education, savings, others, totalDebt, repaymentPlans, investment, pfFunds, property, emergencyFunds });
  
    // Send a response back to the client
    res.json({ success: true, message: 'Form data received successfully' });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
