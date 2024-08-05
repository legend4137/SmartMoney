import React, { useState } from 'react';

import styles from './bottomNav.module.css'; // Adjust import if needed

const BottomNavbar = ({
  inputValue,
  handleInputChange,
  addMoneyToWallet,
  deductMoneyFromWallet,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleOptionSelect = (option) => {
    setSelectedTag(option);
    setDropdownOpen(false);

    deductMoneyFromWallet(Number(inputValue), option, '');

  };

  const handleDeductClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.bottomNavbar}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className="flex items-center space-x-4 relative"> {/* Adjusted gap here */}
          <input
            type="number" // Changed to number input
            placeholder="Enter a number..."
            className={styles.textInput}
            value={inputValue} // Use inputValue directly
            onChange={handleInputChange} // Handle input changes
          />
          <div className={styles.buttonContainer}>
            <button className="btn" onClick={() => addMoneyToWallet(Number(inputValue))}>Add Money</button>
            <button className="btn ml-2" onClick={handleDeductClick}>
              DEDUCT
            </button>
          </div>
          {isDropdownOpen && (
            <div className="relative inline-block ml-4">
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" style={{ bottom: '100%', marginBottom: '8px' }}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {['Entertainment', 'Medical', 'Education', 'Food n Drink', 'Utils', 'Home', 'Transportation', 'Uncategorized'].map(option => (
                    <li key={option}>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          handleOptionSelect(option);
                        }}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;

