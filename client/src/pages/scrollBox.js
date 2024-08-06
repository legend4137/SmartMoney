import React, { useEffect, useState } from 'react';
import './scrollBox.module.css'; // Import your CSS for styling
import axios from 'axios';

const ScrollBox = ({ refresh }) => {
  const [logs, setLogs] = useState([]);
  const userName = sessionStorage.getItem('username');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:12000/scrolling?userName=${userName}`);
        setLogs(Object.values(response.data));
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [userName, refresh]);

  const tableMaxHeight = 420;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[750px] mx-auto">
      <div className="overflow-y-auto" style={{ maxHeight: tableMaxHeight }}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-[#244855] dark:text-white">
            <tr>
              <th scope="col" className="px-4 py-2">S No.</th>
              <th scope="col" className="px-4 py-2">Amount</th>
              <th scope="col" className="px-4 py-2">Reason</th>
              <th scope="col" className="px-4 py-2">Transaction</th>
              <th scope="col" className="px-4 py-2">Tags</th>
              <th scope="col" className="px-4 py-2">Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-4 py-2">{log.amount}</td>
                <td className="px-4 py-2">{log.reason}</td>
                <td className="px-4 py-2">{log.transaction}</td>
                <td className="px-4 py-2">{log.tag}</td>
                <td className="px-4 py-2">{new Date(log.Date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScrollBox;
