import React, { useEffect, useState } from 'react';
import '../form.css';

export default function Form() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
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
    emergencyFunds: '',
    username: '',
    firstName: '',
    surname: '',
    email: ''
  });

  useEffect(() => {
    const step1Link = document.getElementById('step1-link');
    const step2Link = document.getElementById('step2-link');
    const step3Link = document.getElementById('step3-link');
    const step4Link = document.getElementById('step4-link');

    const handleStepClick = (step) => {
      setCurrentStep(step);
    };

    step1Link.addEventListener('click', () => handleStepClick(1));
    step2Link.addEventListener('click', () => handleStepClick(2));
    step3Link.addEventListener('click', () => handleStepClick(3));
    step4Link.addEventListener('click', () => handleStepClick(4));

    return () => {
      step1Link.removeEventListener('click', () => handleStepClick(1));
      step2Link.removeEventListener('click', () => handleStepClick(2));
      step3Link.removeEventListener('click', () => handleStepClick(3));
      step4Link.removeEventListener('click', () => handleStepClick(4));
    };
  }, []);

  useEffect(() => {
    const formStep1 = document.querySelector('.formbold-form-step-1');
    const formStep2 = document.querySelector('.formbold-form-step-2');
    const formStep3 = document.querySelector('.formbold-form-step-3');
    const formStep4 = document.querySelector('.formbold-form-step-4');
    const step1Menu = document.querySelector('.formbold-step-menu1');
    const step2Menu = document.querySelector('.formbold-step-menu2');
    const step3Menu = document.querySelector('.formbold-step-menu3');
    const step4Menu = document.querySelector('.formbold-step-menu4');

    formStep1.classList.remove('active');
    formStep2.classList.remove('active');
    formStep3.classList.remove('active');
    formStep4.classList.remove('active');

    step1Menu.classList.remove('active');
    step2Menu.classList.remove('active');
    step3Menu.classList.remove('active');
    step4Menu.classList.remove('active');

    if (currentStep === 1) {
      formStep1.classList.add('active');
      step1Menu.classList.add('active');
    } else if (currentStep === 2) {
      formStep2.classList.add('active');
      step2Menu.classList.add('active');
    } else if (currentStep === 3) {
      formStep3.classList.add('active');
      step3Menu.classList.add('active');
    } else if (currentStep === 4) {
      formStep4.classList.add('active');
      step4Menu.classList.add('active');
    }
  }, [currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleNextStepClick = (event) => {
    event.preventDefault();
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
              <li className="formbold-step-menu1 active">
                <span>1</span>
                <a href="#" id="step1-link">Step 1</a>
              </li>
              <li className="formbold-step-menu2">
                <span>2</span>
                <a href="#" id="step2-link">Step 2</a>
              </li>
              <li className="formbold-step-menu3">
                <span>3</span>
                <a href="#" id="step3-link">Step 3</a>
              </li>
              <li className="formbold-step-menu4">
                <span>4</span>
                <a href="#" id="step4-link">Step 4</a>
              </li>
            </ul>
          </div>

          <div className="formbold-form-step-1 active">
            <p style={{ paddingBottom: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="username" className="formbold-form-label"> First Name </label>
                <input
                  type="text"
                  name="username"
                  placeholder=""
                  id="username"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="firstName" className="formbold-form-label"> Last Name </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder=""
                  id="firstName"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
          </div>

          <div className="formbold-input-flex">
              <div>
                <label htmlFor="username" className="formbold-form-label"> User Name </label>
                <input
                  type="text"
                  name="username"
                  placeholder=""
                  id="username"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="firstName" className="formbold-form-label"> Email Address </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder=""
                  id="firstName"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
          </div>
          </div>

          <div className="formbold-form-step-2">
            <p style={{ paddingBottom: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="entertainment" className="formbold-form-label"> Monthly Gross Income </label>
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
                <label htmlFor="healthcare" className="formbold-form-label"> Net Income </label>
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
                <label htmlFor="education" className="formbold-form-label"> Housing Cost </label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="savings" className="formbold-form-label"> Utilities </label>
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

            <div>
              <label htmlFor="others" className="formbold-form-label"> Insurance </label>
              <input
                type="text"
                name="others"
                id="others"
                placeholder=""
                className="formbold-form-input"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formbold-form-step-3">
            <p style={{ paddingBottom: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="totalDebt" className="formbold-form-label"> Total Debt </label>
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
                <label htmlFor="repaymentPlans" className="formbold-form-label"> Repayment Plans </label>
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
                <label htmlFor="investment" className="formbold-form-label"> Investment </label>
                <input
                  type="text"
                  name="investment"
                  id="investment"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="pfFunds" className="formbold-form-label"> PF Funds </label>
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
                <label htmlFor="investment" className="formbold-form-label"> Property </label>
                <input
                  type="text"
                  name="investment"
                  id="investment"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="pfFunds" className="formbold-form-label"> Emergency Funds </label>
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
          </div>

          <div className="formbold-form-step-4">
          <p style={{ paddingBottom: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="monthlyGrossIncome" className="formbold-form-label"> Entertainment </label>
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
                <label htmlFor="netIncome" className="formbold-form-label"> Healthcare </label>
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
                <label htmlFor="housingCost" className="formbold-form-label"> Education </label>
                <input
                  type="text"
                  name="housingCost"
                  id="housingCost"
                  className="formbold-form-input"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="utilities" className="formbold-form-label"> Savings</label>
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

            <div>
              <label htmlFor="insurance" className="formbold-form-label"> Others </label>
              <input
                type="text"
                name="insurance"
                id="insurance"
                placeholder=""
                className="formbold-form-input"
                onChange={handleChange}
              />
            </div>
            </div>

          <div className="formbold-form-btn-wrapper">
            {currentStep > 1 && (
              <button className="formbold-back-btn" onClick={handleBackClick}>
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button className="formbold-btn" onClick={handleNextStepClick}>
                Next Step
              </button>
            ) : (
              <button className="formbold-btn" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
