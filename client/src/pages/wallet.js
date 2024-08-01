import React from 'react'
import EditableFields from './editableFields';
import ScrollBox from './scrollBox';
import './wallet.css';
import BottomNavbar from './bottomNav'; 

const Wallet = () => {
  return (
    <div className="wallet-container">
      <div className="editable-fields">
        <EditableFields />
      </div>
      <div className="scroll-box-container">
        <ScrollBox />
      </div>
      <BottomNavbar /> {/* Add the BottomNavbar component */}
    </div>
  );
};

export default Wallet;
