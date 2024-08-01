import React from 'react';
import './editableFields.css';

const EditableFields = () => {
  const data = {
    field1: 'Value 1',
    field2: 'Value 2',
    field3: 'Value 3',
    field4: 'Value 4'
  };

  return (
    <div className="container">
      {['field1', 'field2', 'field3', 'field4'].map((field, index) => (
        <div key={field} className="field-container">
          <label className="label" htmlFor={field}>
            {`Field ${index + 1}`}
          </label>
          <p className="field">{data[field]}</p>
        </div>
      ))}
    </div>
  );
};

export default EditableFields;
