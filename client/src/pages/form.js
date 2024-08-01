import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../form.css';
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

export default function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    monthlyGrossIncome: '',
    netIncome: '',
    housingCost: '',
    utilities: '',
    foodAndGroceries: '',
    transport: '',
    insurance: '',
    entertainment: '',
    healthcare: '',
    education: '',
    savings: '',
    others: '',
    totalDebt: '',
    repaymentPlans: '',
    investment: '',
    pfFunds: '',
    property: '',
    emergencyFunds: ''
  });

  const validateEmail = (email) => {
    const validDomains = ['gmail.com', 'yahoo.co.in', 'outlook.com','iitj.ac.in'];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return false;
    }
    const domain = email.split('@')[1];
    return validDomains.includes(domain);
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      const { userName, firstName, email } = formData;
        if (!userName.trim() || !firstName.trim() || !email.trim()) {
          alert('Please fill out all compulsory fields marked with *.');
          return false;
        }
        if (!validateEmail(email)) {
          alert('Please enter a valid email address.');
          return false;
        }
    }
      if (currentStep === 2) {
        const { monthlyGrossIncome, netIncome, housingCost, utilities, insurance } = formData;
        if (!monthlyGrossIncome || !netIncome || !housingCost || !utilities || !insurance) {
          alert('Please fill out all compulsory fields marked with *');
          return false;
        }
      }
      if (currentStep === 3) {
        const { totalDebt, repaymentPlans, investment, pfFunds, property, emergencyFunds } = formData;
        if (!totalDebt || !repaymentPlans || !investment || !pfFunds || !property || !emergencyFunds) {
          alert('Please fill out all compulsory fields marked with *');
          return false;
        }
      }
      if (currentStep === 4) {
        const { entertainment, healthcare, education, savings } = formData;
        if (!entertainment || !healthcare || !education || !savings) {
          alert('Please fill out all compulsory fields marked with *');
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
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateCurrentStep()) {
        return;
      }
      try {
        const response = await fetch('http://localhost:12000/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleNextStepClick = async (event) => {
      event.preventDefault();
      if (!validateCurrentStep()) {
        return;
      }

      // Check for duplicate username
      const isDuplicate = await checkDuplicates(formData.userName);
      if (currentStep == 1) {
        if (isDuplicate) {
          alert('Username already exists!');
          return; // Stop execution if duplicate is found
        }
      }

      try {
        const response = await axios.post('http://localhost:12000/api/form', formData);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error storing data:', error);
        return;
      }
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }

    };



    const handleBackClick = (event) => {
      event.preventDefault();
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="formbold-steps">
              <ul>
                <li
                  className={`formbold-step-menu1 ${currentStep === 1 ? 'active' : ''}`}
                  onClick={() => handleStepClick(1)}
                >
                  <span>1</span>
                  <a href="#">Step 1</a>
                </li>
                <li
                  className={`formbold-step-menu2 ${currentStep === 2 ? 'active' : ''}`}
                  onClick={() => handleStepClick(2)}
                >
                  <span>2</span>
                  <a href="#">Step 2</a>
                </li>
                <li
                  className={`formbold-step-menu3 ${currentStep === 3 ? 'active' : ''}`}
                  onClick={() => handleStepClick(3)}
                >
                  <span>3</span>
                  <a href="#">Step 3</a>
                </li>
                <li
                  className={`formbold-step-menu4 ${currentStep === 4 ? 'active' : ''}`}
                  onClick={() => handleStepClick(4)}
                >
                  <span>4</span>
                  <a href="#">Step 4</a>
                </li>
              </ul>
            </div>

            <div className={`formbold-form-step-1 ${currentStep === 1 ? 'active' : ''}`}>
              <p style={{ paddingBottom: '20px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="firstName" className="formbold-form-label">
                    First Name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder=""
                    id="firstName"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="formbold-form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder=""
                    id="lastName"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="email" className="formbold-form-label">
                    Email Address<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder=""
                    id="email"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="userName" className="formbold-form-label">
                    Username<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder=""
                    id="userName"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={`formbold-form-step-2 ${currentStep === 2 ? 'active' : ''}`}>
              <p style={{ paddingBottom: '20px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="monthlyGrossIncome" className="formbold-form-label">
                    Monthly Gross Income<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="monthlyGrossIncome"
                    placeholder=""
                    id="monthlyGrossIncome"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="netIncome" className="formbold-form-label">
                    Net Income<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="netIncome"
                    placeholder=""
                    id="netIncome"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="housingCost" className="formbold-form-label">
                    Housing Cost<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="housingCost"
                    placeholder=""
                    id="housingCost"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="utilities" className="formbold-form-label">
                    Utilities<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="utilities"
                    placeholder=""
                    id="utilities"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="insurance" className="formbold-form-label">
                    Insurance<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="insurance"
                    placeholder=""
                    id="insurance"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="foodAndGroceries" className="formbold-form-label">
                    Food and Groceries
                  </label>
                  <input
                    type="text"
                    name="foodAndGroceries"
                    placeholder=""
                    id="foodAndGroceries"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="transport" className="formbold-form-label">
                    Transport
                  </label>
                  <input
                    type="text"
                    name="transport"
                    placeholder=""
                    id="transport"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="others" className="formbold-form-label">
                    Others
                  </label>
                  <input
                    type="text"
                    name="others"
                    placeholder=""
                    id="others"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={`formbold-form-step-3 ${currentStep === 3 ? 'active' : ''}`}>
              <p style={{ paddingBottom: '20px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="totalDebt" className="formbold-form-label">
                    Total Debt<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="totalDebt"
                    placeholder=""
                    id="totalDebt"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="repaymentPlans" className="formbold-form-label">
                    Repayment Plans<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="repaymentPlans"
                    placeholder=""
                    id="repaymentPlans"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="investment" className="formbold-form-label">
                    Investment<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="investment"
                    placeholder=""
                    id="investment"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="pfFunds" className="formbold-form-label">
                    PF Funds<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="pfFunds"
                    placeholder=""
                    id="pfFunds"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="property" className="formbold-form-label">
                    Property<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="property"
                    placeholder=""
                    id="property"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="emergencyFunds" className="formbold-form-label">
                    Emergency Funds<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="emergencyFunds"
                    placeholder=""
                    id="emergencyFunds"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={`formbold-form-step-4 ${currentStep === 4 ? 'active' : ''}`}>
              <p style={{ paddingBottom: '20px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="entertainment" className="formbold-form-label">
                    Entertainment<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="entertainment"
                    placeholder=""
                    id="entertainment"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="healthcare" className="formbold-form-label">
                    Healthcare<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="healthcare"
                    placeholder=""
                    id="healthcare"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="education" className="formbold-form-label">
                    Education<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="education"
                    placeholder=""
                    id="education"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="savings" className="formbold-form-label">
                    Savings<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="savings"
                    placeholder=""
                    id="savings"
                    className="formbold-form-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="formbold-buttons flex">
              <button
                className="formbold-btn"
                onClick={handleBackClick}
                disabled={currentStep === 1}
              >
                Back
              </button>
              {currentStep < 4 && (
                <button className="formbold-btn" onClick={handleNextStepClick}>
                  Next
                </button>
              )}
              {currentStep === 4 && (
                <Link to='/dashboard'>
                  <button className="formbold-btn" type="submit" >
                    Submit
                  </button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    );
}