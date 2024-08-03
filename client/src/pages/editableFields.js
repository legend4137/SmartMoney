import React from 'react';
import styles from './editableFields.module.css';

const EditableFields = ({ data }) => {
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
