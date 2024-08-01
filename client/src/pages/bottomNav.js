import React, { useState } from 'react';
import './bottomNav.css';

const BottomNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DEDUCT');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <div className="bottom-navbar">
      <input type="text" placeholder="Type something..." className="text-input" />
      <div className="button-container">
        <button className="btn">ADD</button>
        <button className="btn" onClick={() => setShowDropdown(!showDropdown)}>
          {selectedOption}
        </button>
        {showDropdown && (
          <div className="dropdown-btn">
            <button className="btn action-btn">{selectedOption}</button>
            <button className="btn dropdown-toggle">▼</button>
            <div className="dropdown-content">
              <button className="dropdown-item" onClick={() => handleOptionSelect('Option 1')}>Option 1</button>
              <button className="dropdown-item" onClick={() => handleOptionSelect('Option 2')}>Option 2</button>
              <button className="dropdown-item" onClick={() => handleOptionSelect('Option 3')}>Option 3</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;
