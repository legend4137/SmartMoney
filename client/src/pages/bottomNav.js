import React from 'react';
import './bottomNav.css'; 

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <input type="text" placeholder="Type something..." className="text-input" />
      <div className="button-container">
        <button className="btn">ADD</button>
        <button className="btn">DEDUCT</button>
      </div>
    </div>
  );
};

export default BottomNavbar;
