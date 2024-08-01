import React, { useState } from 'react';
import './bottomNav.css';

const BottomNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DEDUCT');
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="bottom-navbar">
      <input type="text" placeholder="Type something..." className="text-input" />
      <div className="button-container">
        <button className="btn" onClick={() => handleOptionSelect('ADD')}>
          ADD
        </button>
        <button className="btn" onClick={() => handleOptionSelect('DEDUCT')}>
          DEDUCT
        </button>
        {showDropdown && (
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="dropdown-button"
              type="button"
            >
              Dropdown button
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
                className="dropdown-content"
              >
                <ul className="dropdown-list">
                  <li>
                    <a href="#" className="dropdown-item">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Sign out
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
