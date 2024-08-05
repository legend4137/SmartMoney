import React, { useState } from 'react';
import axios from 'axios';

const checkDuplicates = async (userName) => {
  try {
    const response = await axios.get(`http://localhost:12000/handleDuplicates?userName=${userName}`);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return false;
  }
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    monthlyGrossIncome: '',
    netIncome: '',
    housingCost: '',
    utilities: '',
    insurance: '',
    totalDebt: '',
    repaymentPlans: '',
    investment: '',
    pfFunds: '',
    property: '',
    emergencyFunds: '',
    entertainment: '',
    healthcare: '',
    education: '',
    savings: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

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

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
  };

  return (
    <section className="py-8 bg-gray-900 md:py-16 min-h-screen flex items-center antialiased text-white">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full hidden dark:block"
              src="https://picsum.photos/800/800"
              style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
              alt="iMac"
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
                      First Name
                    </label>
                    <input
                      type="number"
                      name="totalDebt"
                      value={formData.totalDebt}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="number"
                      name="repaymentPlans"
                      value={formData.repaymentPlans}
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
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
              
              
              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Monthly Gross Income
                    </label>
                    <input
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
                      type="number"
                      name="insurance"
                      value={formData.insurance}
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
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      
                    >
                      Edit
                    </button>
                  </div>
                </>
                
              )}
              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Total Debt
                    </label>
                    <input
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
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      
                    >
                      Edit
                    </button>
                    
                  </div>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Entertainment
                    </label>
                    <input
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
                      type="number"
                      name="savings"
                      value={formData.savings}
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
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     
                    >
                      Edit
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
