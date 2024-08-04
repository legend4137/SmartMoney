import React from 'react';
import styles from './bottomNav.module.css'; // Adjust import if needed

const BottomNavbar = ({
  inputValue,
  handleInputChange,
  addMoneyToWallet,
  deductMoneyFromWallet,
  toggleDropdown,
  isOpen,
  showDropdown,
  handleOptionSelect
}) => {
  return (
    <div className={styles.bottomNavbar}>
      <input 
        type="number" // Changed to number input
        placeholder="Enter a number..." 
        className={styles.textInput} 
        value={inputValue} // Use inputValue directly
        onChange={handleInputChange} // Handle input changes
      />
      <div className={styles.buttonContainer}>
        <button className="btn" onClick={() => addMoneyToWallet(Number(inputValue))}>Add Money</button>
        <button className="btn" onClick={() => deductMoneyFromWallet(Number(inputValue), 'entertainment', 'withdraw')}>
          DEDUCT
        </button>
        {showDropdown && (
          <div className={styles.relative}>
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
                style={{ bottom: '100%', marginBottom: '8px' }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleOptionSelect('Entertainment')}
                    >
                      Entertainment
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleOptionSelect('Food n Drink')}
                    >
                      Food n Drink
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleOptionSelect('Utils')}
                    >
                      Utils
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleOptionSelect('Home')}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleOptionSelect('Transportation')}
                    >
                      Transportation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleOptionSelect('Uncategorized')}
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