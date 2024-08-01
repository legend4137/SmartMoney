import React from 'react'
import EditableFields from './editableFields';
import ScrollBox from './scrollBox';
import './wallet.css';

const Wallet = () => {
  return (
    <div className="wallet-container">
      <div className="editable-fields">
        <EditableFields />
      </div>
      <div className="scroll-box-container">
        <ScrollBox />
      </div>
    </div>
  );
};

export default Wallet;
