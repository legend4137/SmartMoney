import React, { useState } from 'react';
import axios from 'axios';
import styles from './bottomNav.module.css';

const userName = sessionStorage.getItem('userName');

const BottomNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DEDUCT');
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(); // Define the state for capturing user input

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'DEDUCT') {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update input value state
  };

  // const BottomNav = () => {
    const [wallet, setWallet] = useState(null);
    const [error, setError] = useState('');
  
    const createWallet = async (userName) => {
      try {
        const response = await axios.post('http://localhost:12000/wallet/create', { userName });
        setWallet(response.data);
      } catch (err) {
        setError(err.response.data.msg);
      }
    };
  
    const addMoneyToWallet = async (userName, amount) => {
      try {
        const response = await axios.post('http://localhost:12000/wallet/add', { userName, amount });
        setWallet(response.data);
      } catch (err) {
        setError(err.response.data.msg);
      }
    };
  
    const deductMoneyFromWallet = async (userName, amount, tag, reason) => {
      try {
        const response = await axios.post('http://localhost:12000/wallet/deduct', { userName, amount, tag, reason });
        setWallet(response.data);
      } catch (err) {
        setError(err.response.data.msg);
      }
    };
  
    const getWalletByUsername = async (userName) => {
      try {
        const response = await axios.get(`http://localhost:12000/wallet/${userName}`);
        setWallet(response.data);
      } catch (err) {
        setError(err.response.data.msg);
      }
    };

  return (
    <div className="bottom-navbar">
      <input 
        type="number" // Changed to number input
        placeholder="Enter a number..." 
        className="text-input" 
        value={Number(inputValue)} // Bind input value to state
        onChange={handleInputChange} // Handle input changes
      />
      <div className="button-container">
      <button className="btn" onClick={() => addMoneyToWallet(userName, Number(inputValue))}>Add Money</button>
        <button className="btn" onClick={() => deductMoneyFromWallet(userName,Number(inputValue),'entertainment','withdraw')}>
          DEDUCT
        </button>
        {showDropdown && (
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              TYPES
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isOpen && (
              <div
                id="dropdown"
                className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                style={{ bottom: '100%', marginBottom: '8px' }} // Adjusts position to be above the button
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Entertainment
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Food n Drink
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Utils
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Transportation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Uncategorized 
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;
