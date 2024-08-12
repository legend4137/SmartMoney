import React, { useEffect, useState } from 'react';
import EditableFields from './parentComponent';
import ScrollBox from './scrollBox';
import BottomNavbar from './bottomNav';
import ParentComponent from './parentComponent';
import styles from './wallet.module.css'; 
import ChatPopup from './ChatPopup';

const Wallet = () => {
  const userName = localStorage.getItem("username");
  return (
    <div className="wallet-container min-h-screen bg-[#111827]">
      <div className="main-content">
        <div className="editable-fields">
          <ParentComponent />
        </div>
      </div>
      <ChatPopup />
    </div>
  );
};

export default Wallet;
