import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const userName = sessionStorage.getItem("username");

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [oldData, setOldData] = useState({});
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:12000/wallet-card`, {
          params: { userName } // Use axios params for query strings
        });
        setOldData(response.data);
        console.log("Old data:", response.data);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };
    fetchData();
  }, [userName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);

    const updatedData = {};
    for (const key in formData) {
      if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
        updatedData[key] = formData[key];
      } else if (oldData[key] !== undefined) {
        updatedData[key] = oldData[key];
      }
    }
    try {
      const bodyData = {
        accountId: userName,
        updatedData: updatedData,
      };
      const formResponse = await fetch("http://localhost:12000/update_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
      });
      const formResult = await formResponse.json();
      console.log(formResult);
      navigate(`/entry`);
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      console.log(`This is a check statement: ${formData.userName}`);
      console.log(`Fetching data for userName: ${formData.userName}`); // Log userName
      const parameter = sessionStorage.getItem("username");
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
  return (
    <section className="py-8 bg-gray-900 md:py-16 min-h-screen flex items-center antialiased text-white">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full hidden dark:block"
              src="https://design4users.com/wp-content/uploads/2019/11/light-dark-UI-design-tips-tubik-blog.jpg"
              style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
              alt="icon"
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-white sm:text-3xl">
              EDIT ACCOUNT INFO
            </h1>
            <hr className="my-6 md:my-8 border-gray-800" />

            <form onSubmit={handleSubmit}>              
              
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Monthly Gross Income
                    </label>
                    <input
                      placeholder= {oldData.monthlyGrossIncome || ""}
                      type="number"
                      name="monthlyGrossIncome"
                      value={formData.monthlyGrossIncome}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Net Income
                    </label>
                    <input
                      placeholder= {oldData.netIncome || ""}
                      type="number"
                      name="netIncome"
                      value={formData.netIncome}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Housing Cost
                    </label>
                    <input
                      placeholder= {oldData.housingCost || ""}
                      type="number"
                      name="housingCost"
                      value={formData.housingCost}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Utilities
                    </label>
                    <input
                      placeholder= {oldData.utilities || ""}
                      type="number"
                      name="utilities"
                      value={formData.utilities}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Insurance
                    </label>
                    <input
                      placeholder= {oldData.insurance || ""}
                      type="number"
                      name="insurance"
                      value={formData.insurance}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Food And Groceries
                    </label>
                    <input
                      placeholder= {oldData.foodAndGroceries || ""}
                      type="number"
                      name="foodAndGroceries"
                      value={formData.foodAndGroceries}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Transport
                    </label>
                    <input
                      placeholder= {oldData.transport || ""}
                      type="number"
                      name="transport"
                      value={formData.transport}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleNextStep}
                    >
                      Next
                    </button>
                  </div>
                </>
                
              )}
              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Total Debt
                    </label>
                    <input
                      placeholder= {oldData.totalDebt || ""}
                      type="number"
                      name="totalDebt"
                      value={formData.totalDebt}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Repayment Plans
                    </label>
                    <input
                      placeholder= {oldData.repaymentPlans || ""}
                      type="number"
                      name="repaymentPlans"
                      value={formData.repaymentPlans}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Investment
                    </label>
                    <input
                      placeholder= {oldData.investment || ""}
                      type="number"
                      name="investment"
                      value={formData.investment}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      PF Funds
                    </label>
                    <input
                      placeholder= {oldData.pfFunds || ""}
                      type="number"
                      name="pfFunds"
                      value={formData.pfFunds}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Property
                    </label>
                    <input
                      placeholder= {oldData.property || ""}
                      type="number"
                      name="property"
                      value={formData.property}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Emergency Funds
                    </label>
                    <input
                      placeholder= {oldData.emergencyFunds || ""}
                      type="number"
                      name="emergencyFunds"
                      value={formData.emergencyFunds}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handlePreviousStep}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleNextStep}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Entertainment
                    </label>
                    <input
                      placeholder= {oldData.entertainment || ""}
                      type="number"
                      name="entertainment"
                      value={formData.entertainment}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Healthcare
                    </label>
                    <input
                      placeholder= {oldData.healthcare || ""}
                      type="number"
                      name="healthcare"
                      value={formData.healthcare}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Education
                    </label>
                    <input
                      placeholder= {oldData.education || ""}
                      type="number"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Savings
                    </label>
                    <input
                      placeholder= {oldData.savings || ""}
                      type="number"
                      name="savings"
                      value={formData.savings}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Others
                    </label>
                    <input
                      placeholder= {oldData.others || ""}
                      type="number"
                      name="others"
                      value={formData.others}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handlePreviousStep}
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;