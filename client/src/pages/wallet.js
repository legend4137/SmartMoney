import React, { useEffect, useState } from 'react';
import EditableFields from './parentComponent';
import ScrollBox from './scrollBox';
// import './wallet.css';
import BottomNavbar from './bottomNav'; 
import Navbar from './navbar';
import ParentComponent from './parentComponent';

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
        <ParentComponent />
        </div>
        <div className="scroll-box-container-wrapper">
        </div>
      </div>
    </div>
  );
};

export default Wallet;
