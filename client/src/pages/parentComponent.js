import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNavbar from './bottomNav';
import EditableFields from './editableFields';
import ScrollBox from './scrollBox';
import Navbar from './navbar';
import Footer from './footer';
import DailyAlerts from './DailyAlerts';

const ParentComponent = () => {
  const userName = sessionStorage.getItem('username');
  const [walletData, setWalletData] = useState({
    field1: '0',
    field2: '0',
    field3: '0',
    field4: '0',
  });
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DEDUCT');
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:12000/wallet-card', {
        params: { userName }
      });
      setWalletData({
        field1: response.data.posamount || 0,
        field2: response.data.negamount || 0,
        field3: response.data.balance || 0,
        field4: parseInt(response.data.totalDebt) || 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const addMoneyToWallet = async (amount) => {
    if(amount<0){
      alert("Adding a negative value to your account is not allowed.")
      return;
    };
    try {
      await axios.post('http://localhost:12000/wallet/add', { userName, amount });
      setRefresh(prev => !prev);
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const deductMoneyFromWallet = async (amount, tag, reason) => {
    if(amount<0){
      alert("You cannot deduct a negative value from your account.")
    }
    if (amount > walletData.field3) { // Check if amount is greater than the balance
      alert("You cannot deduct an amount greater than the available balance.");
      return;
    }
    try {
      await axios.post('http://localhost:12000/wallet/deduct', { userName, amount, tag});
      setRefresh(prev => !prev); // This will trigger fetchData() due to refresh change
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'DEDUCT') {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setIsOpen(false); // Close dropdown if option is not 'DEDUCT'
    }
  };

  return (
    <div>
      <EditableFields data={walletData} />
      <ScrollBox refresh={refresh} />
      <DailyAlerts refresh={refresh}/>
      <BottomNavbar
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        addMoneyToWallet={addMoneyToWallet}
        deductMoneyFromWallet={deductMoneyFromWallet}
        toggleDropdown={toggleDropdown}
        isOpen={isOpen}
        showDropdown={showDropdown}
        handleOptionSelect={handleOptionSelect}
      />
    </div>
  );
};

export default ParentComponent;
