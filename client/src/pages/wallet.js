import React, { useEffect, useState } from 'react';
import EditableFields from './editableFields';
import ScrollBox from './scrollBox';
// import './wallet.css';
import BottomNavbar from './bottomNav'; 
import Navbar from './navbar';

const Wallet = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve the username from session storage
    const storedUserName = sessionStorage.getItem("user");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="wallet-container">

      <Navbar className="navbar" /> {/* Navbar at the top */}
      <div className="main-content">
        <div className="editable-fields">
          <EditableFields userName={userName} />
        </div>
        <div className="scroll-box-container-wrapper">
          <div className="scroll-box-container">
            <ScrollBox />
          </div>
          <BottomNavbar className="bottom-navbar" /> BottomNavbar at the bottom
        </div>

      </div>
    </div>
  );
};

export default Wallet;
