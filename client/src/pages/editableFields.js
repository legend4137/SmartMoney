import React from 'react';
import './editableFields.css';

const EditableFields = () => {
  const data = {
    field1: '5000',
    field2: '3000',
    field3: '2000',
  };

  return (
    <div className="container">
      {['field1', 'field2', 'field3'].map((field, index) => (
        <div key={field} className="field-container">
          <label className="label" htmlFor={field}>
            {field === 'field1' ? 'Last Deposit' : field === 'field2' ? 'Last Withdraw' : field === 'field3' ? 'Debt' :`Field ${index + 1}`}
          </label>
          <p className="field">{data[field]}</p>
        </div>
      ))}
    </div>
  );
};

export default EditableFields;
