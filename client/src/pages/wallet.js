import React, { useEffect, useState } from 'react';
import EditableFields from './parentComponent';
import ScrollBox from './scrollBox';
import BottomNavbar from './bottomNav'; 
import Navbar from './navbar';
import ParentComponent from './parentComponent';
import styles from './wallet.module.css'; // Adjust import if using CSS modules

const Wallet = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("user");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="wallet-container bg-[#90AEAD] min-h-screen">

      <Navbar className="navbar" /> {/* Navbar at the top */}
      <div className="main-content">
        <div className="editable-fields">
        <ParentComponent />
        </div>
        <div className="scroll-box-container-wrapper">
        </div>
      </div>
      {/* <div className={styles.editableFields}>
          <EditableFields userName={userName} />
        </div> */}
    </div>
  );
};

export default Wallet;
