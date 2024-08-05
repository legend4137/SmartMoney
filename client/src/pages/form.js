import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
var y=0

const checkDuplicates = async (userName) => {
  try {
    const response = await axios.get(
      `http://localhost:12000/handleDuplicates?userName=${userName}`
    );
    return response.data.exists;
  } catch (error) {
    console.error("Error checking duplicates:", error);
    return false;
  }
};

export default function Form() {
  const [healthscore, setHealthscore] = useState(0);

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    monthlyGrossIncome: "",
    netIncome: "",
    housingCost: "",
    utilities: "",
    foodAndGroceries: "",
    transport: "",
    insurance: "",
    entertainment: "",
    healthcare: "",
    education: "",
    savings: "",
    others: "",
    totalDebt: "",
    repaymentPlans: "",
    investment: "",
    pfFunds: "",
    property: "",
    emergencyFunds: "",
  });

  const validateEmail = (email) => {
    const validDomains = [
      "gmail.com",
      "yahoo.co.in",
      "outlook.com",
      "iitj.ac.in",
    ];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return false;
    }
    const domain = email.split("@")[1];
    return validDomains.includes(domain);
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      const { userName, firstName, email } = formData;
      if (!userName.trim() || !firstName.trim() || !email.trim()) {
        alert("Please fill out all compulsory fields marked with *.");
        return false;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
      }
    }
    if (currentStep === 2) {
      const {
        monthlyGrossIncome,
        netIncome,
        housingCost,
        utilities,
        insurance,
      } = formData;
      if (
        monthlyGrossIncome < 0 ||
        netIncome < 0 ||
        housingCost < 0 ||
        utilities < 0 ||
        insurance < 0
      ) {
        alert("You cannot submit negative values");
        return;
      }
      if (
        !monthlyGrossIncome ||
        !netIncome ||
        !housingCost ||
        !utilities ||
        !insurance
      ) {
        alert("Please fill out all compulsory fields marked with *");
        return false;
      }
    }
    if (currentStep === 3) {
      const {
        totalDebt,
        repaymentPlans,
        investment,
        pfFunds,
        property,
        emergencyFunds,
      } = formData;
      if (
        totalDebt < 0 ||
        repaymentPlans < 0 ||
        investment < 0 ||
        pfFunds < 0 ||
        property < 0 ||
        emergencyFunds < 0
      ) {
        alert("You cannot submit negative values");
        return;
      }
      if (
        !totalDebt ||
        !repaymentPlans ||
        !investment ||
        !pfFunds ||
        !property ||
        !emergencyFunds
      ) {
        alert("Please fill out all compulsory fields marked with *");
        return false;
      }
    }
    if (currentStep === 4) {
      const { entertainment, healthcare, education, savings } = formData;
      if (entertainment < 0 || healthcare < 0 || education < 0 || savings < 0) {
        alert("You cannot submit a negative value");
        return;
      }
      if (!entertainment || !healthcare || !education || !savings) {
        alert("Please fill out all compulsory fields marked with *");
        return false;
      }
    }
    return true;
  };

  const handleStepClick = (step) => {
    if (step < currentStep || validateCurrentStep()) {
      setCurrentStep(step);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateCurrentStep()) {
      return;
    }
    try {
      // Submit form data to Firebase
      const formResponse = await fetch("http://localhost:12000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const formResult = await formResponse.json();
      console.log(formResult);

      // Create a new user in MongoDB collection 'wallets'
      const walletResponse = await fetch(
        "http://localhost:12000/wallet/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: formData.userName }), // Send the userName
        }
      );
      const walletResult = await walletResponse.json();
      console.log(walletResult);

      // Store username in sessionStorage
      sessionStorage.clear();
      sessionStorage.setItem("username", formData.userName);
      console.log(
        `This is a check statement to see if session storage is working: ${formData.userName}`
      );
      navigate(`/entry`);
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      console.log(`This is a check statement: ${formData.userName}`);
      console.log(`Fetching data for userName: ${formData.userName}`); // Log userName
      const parameter = formData.userName;
      console.log(`Parameter value: ${parameter}`);
      const response = await axios.get("http://localhost:12000/health-rec", {
        params: { userName: parameter }, // Use axios params for query strings
      });
      // setHealthscore(response.data.number); // Set healthscore state
      console.log("Response data:", response.data.number); // Log API response data
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const healthScoreSubmit = async (e) => {
    try {
      console.log(`This is a check statement: ${userName}`);
      console.log(`Fetching data for userName: ${userName}`); // Log userName
      const response = await axios.get("http://localhost:12000/health-rec", {
        params: { userName }, // Use axios params for query strings
      });
      setHealthscore(response.data.number); // Set healthscore state
      console.log("Response data:", response.data.number); // Log API response data
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const handleNextStepClick = async (event) => {
    if (currentStep === 1) {
      sessionStorage.clear();
      sessionStorage.setItem("username", formData.userName);
    }
    event.preventDefault();
    if (!validateCurrentStep()) {
      return;
    }

    // Check for duplicate username
    const isDuplicate = await checkDuplicates(formData.userName);
    if (currentStep === 1 && y==0) {
      y=1
      if (isDuplicate) {
        alert("Username already exists!");
        return; // Stop execution if duplicate is found
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:12000/api/form",
        formData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error storing data:", error);
    }
    if (validateCurrentStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const [userName, setUserName] = useState(sessionStorage.getItem("username"));

  const handleBackClick = (event) => {
    event.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <ul className="flex space-x-4">
              <li
                className={`cursor-pointer ${
                  currentStep === 1
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => handleStepClick(1)}
              >
                <a href="#" className="text-sm">
                  Step 1
                </a>
              </li>
              <li
                className={`cursor-pointer ${
                  currentStep === 2
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => handleStepClick(2)}
              >
                <a href="#" className="text-sm">
                  Step 2
                </a>
              </li>
              <li
                className={`cursor-pointer ${
                  currentStep === 3
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => handleStepClick(3)}
              >
                <a href="#" className="text-sm">
                  Step 3
                </a>
              </li>
              <li
                className={`cursor-pointer ${
                  currentStep === 4
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => handleStepClick(4)}
              >
                <a href="#" className="text-sm">
                  Step 4
                </a>
              </li>
            </ul>
          </div>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username *
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="monthlyGrossIncome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Monthly Gross Income *
                  </label>
                  <input
                    type="number"
                    id="monthlyGrossIncome"
                    name="monthlyGrossIncome"
                    value={formData.monthlyGrossIncome}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="netIncome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Net Income *
                  </label>
                  <input
                    type="number"
                    id="netIncome"
                    name="netIncome"
                    value={formData.netIncome}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="housingCost"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Housing Cost *
                  </label>
                  <input
                    type="number"
                    id="housingCost"
                    name="housingCost"
                    value={formData.housingCost}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="utilities"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Utilities *
                  </label>
                  <input
                    type="number"
                    id="utilities"
                    name="utilities"
                    value={formData.utilities}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="foodAndGroceries"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Food And Groceries *
                  </label>
                  <input
                    type="number"
                    id="foodAndGroceries"
                    name="foodAndGroceries"
                    value={formData.foodAndGroceries}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="transport"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Transport *
                  </label>
                  <input
                    type="number"
                    id="transport"
                    name="transport"
                    value={formData.transport}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="insurance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Insurance *
                </label>
                <input
                  type="number"
                  id="insurance"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="totalDebt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Debt *
                  </label>
                  <input
                    type="number"
                    id="totalDebt"
                    name="totalDebt"
                    value={formData.totalDebt}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="repaymentPlans"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Repayment Plans *
                  </label>
                  <input
                    type="number"
                    id="repaymentPlans"
                    name="repaymentPlans"
                    value={formData.repaymentPlans}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="investment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Investment *
                  </label>
                  <input
                    type="number"
                    id="investment"
                    name="investment"
                    value={formData.investment}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="pfFunds"
                    className="block text-sm font-medium text-gray-700"
                  >
                    PF Funds *
                  </label>
                  <input
                    type="number"
                    id="pfFunds"
                    name="pfFunds"
                    value={formData.pfFunds}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="property"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Property *
                  </label>
                  <input
                    type="number"
                    id="property"
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="emergencyFunds"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emergency Funds *
                  </label>
                  <input
                    type="number"
                    id="emergencyFunds"
                    name="emergencyFunds"
                    value={formData.emergencyFunds}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="entertainment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Entertainment *
                  </label>
                  <input
                    type="number"
                    id="entertainment"
                    name="entertainment"
                    value={formData.entertainment}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="healthcare"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Healthcare *
                  </label>
                  <input
                    type="number"
                    id="healthcare"
                    name="healthcare"
                    value={formData.healthcare}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Education *
                  </label>
                  <input
                    type="number"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="savings"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Savings *
                  </label>
                  <input
                    type="number"
                    id="savings"
                    name="savings"
                    value={formData.savings}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="others"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Others *
                  </label>
                  <input
                    type="number"
                    id="others"
                    name="others"
                    value={formData.others}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBackClick}
                className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400"
              >
                Back
              </button>
            )}
            {currentStep < 4 && (
              <button
                type="button"
                onClick={handleNextStepClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            )}
            {currentStep === 4 && (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
