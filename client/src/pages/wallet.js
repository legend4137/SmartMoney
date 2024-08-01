import React from 'react'
import EditableFields from './editableFields';
import ScrollBox from './scrollBox';
import './wallet.css';
import BottomNavbar from './bottomNav'; 
import NavbarDemo from '../navbar-demo';

const Wallet = () => {
  return (
    <div className="wallet-container">
      <div>
        <EditableFields />
      </div>
      <div className="scroll-box-container">
        <NavbarDemo />
        <ScrollBox />
        <BottomNavbar /> {/* Add the BottomNavbar component */}
      </div>
    </div>
  );
};

export default Wallet;
