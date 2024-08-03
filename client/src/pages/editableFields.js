import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './editableFields.module.css';

const EditableFields = ({ onUpdate }) => {
  const [data, setData] = useState({
    field1: '0',
    field2: '0',
    field3: '0',
    field4: '0',
  });
  const userName = sessionStorage.getItem("username"); // Get the username from sessionStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:12000/wallet-card', {
          params: { userName }
        });
        console.log('API response:', response.data); // Log the API response
        const fetchedData = {
          field1: response.data.posamount || 0,
          field2: response.data.negamount || 0,
          field3: response.data.balance || 0,
          field4: parseInt(response.data.totalDebt) || 0,
        };
        setData(fetchedData);
        if (onUpdate) {
          onUpdate(fetchedData); // Call the onUpdate callback with the fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userName) {
      fetchData();
    }
  }, [userName]); // No need for `refresh` here anymore

  return (
    <div className="container">
      {['field1', 'field2', 'field3', 'field4'].map((field, index) => (
        <div key={field} className="field-container">
          <label className="label" htmlFor={field}>
            {field === 'field1' ? 'Last Deposit' : field === 'field2' ? 'Last Withdraw' : field === 'field3' ? 'Balance' : field === 'field4' ? 'Debt' : `Field ${index + 1}`}
          </label>
          <p className="field">{data[field]}</p>
        </div>
      ))}
    </div>
  );
};

export default EditableFields;
