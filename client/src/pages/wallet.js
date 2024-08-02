import React from 'react';
import EditableFields from './editableFields';
import ScrollBox from './scrollBox';
import './wallet.css';
import BottomNavbar from './bottomNav'; 
import Navbar from '../navbar';

const Wallet = () => {
  return (
    <div className="wallet-container">

      <Navbar className="navbar" /> {/* Navbar at the top */}
      <div className="main-content">
        <div className="editable-fields">
          <EditableFields userName='TestData' />
        </div>
        <div className="scroll-box-container-wrapper">
          <div className="scroll-box-container">
            <ScrollBox />
          </div>
          <BottomNavbar className="bottom-navbar" /> {/* BottomNavbar at the bottom */}
        </div>

      </div>
    </div>
  );
};

export default Wallet;
