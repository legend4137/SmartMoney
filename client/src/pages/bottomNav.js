import React, { useState } from 'react';
import './bottomNav.css';

const BottomNavbar = () => {
  const [selectedOption, setSelectedOption] = useState('DEDUCT');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bottom-navbar">
      <input type="text" placeholder="Enter Amount" className="text-input" />
      <div className="button-container">
        <button className="btn">ADD</button>
        <div className="dropdown-btn">
          <button className="btn action-btn">{selectedOption}</button>
          <button className="btn dropdown-toggle">▼</button>
          <div className="dropdown-content">
            {/* add the href in the button */}
            <button className="dropdown-item" onClick={() => handleOptionSelect('Entertainment')}>Entertainment</button>
            <button className="dropdown-item" onClick={() => handleOptionSelect('Option 2')}>Utilities</button>
            <button className="dropdown-item" onClick={() => handleOptionSelect('Option 3')}>Transport</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
