import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WalletCard.css'; // Import the CSS file for animations

const PlanCard = () => {
  const navigate = useNavigate();

  const handleOpenWallet = () => {
    navigate('/wallet');
  };
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Wallet Balance</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">₹</span>
        <span className="text-5xl font-extrabold tracking-tight">0</span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400"></span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex items-center">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3"></span>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Last Deposit</span>
          <div className="ml-auto text-2xl font-bold text-blue-600 dark:text-blue-400 animated-text">₹5000</div>
        </li>
        <li className="flex items-center">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Last Withdrawl</span>
          <div className="ml-auto text-2xl font-bold text-green-600 dark:text-green-400 animated-text">₹3000</div>
        </li>
        <li className="flex items-center">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Debt</span>
          <div className="ml-auto text-2xl font-bold text-red-600 dark:text-red-400 animated-text">₹2000</div>
        </li>
        
      </ul>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        onClick={handleOpenWallet}
      >
        Open Wallet
      </button>
    </div>
  );
};

export default PlanCard;

