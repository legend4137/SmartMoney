import React, { useState } from 'react';
import styles from './editableFields.module.css';

const EditableFields = ({ data }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='border-black'>
      {/* Toggle button */}
      <div className="text-center mb-4">
        <button
          className="mt-10 mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? 'Hide Transactions' : 'Show Transactions'}
        </button>
      </div>

      {/* Drawer component */}
      <div
        id="drawer-contact"
        className={`fixed top-16 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        tabIndex="-1"
        aria-labelledby="drawer-contact-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          <svg
            className="w-4 h-4 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
          Recent Transactions
        </h5>
        <form className="mb-6">
          <div className="mb-6">
            <label
              htmlFor="last-deposit"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Deposit
            </label>
            <input
              type="text"
              id="last-deposit"
              value={data.field1}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last Deposit"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="last-withdraw"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Withdraw
            </label>
            <input
              type="text"
              id="last-withdraw"
              value={data.field2}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last Withdraw"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="balance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Balance
            </label>
            <input
              type="text"
              id="balance"
              value={data.field3} // Update this to the correct field for balance
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Balance"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="debt"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Debt
            </label>
            <input
              type="text"
              id="debt"
              value={data.field4}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Debt"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditableFields;
