import React, { useState } from 'react';
import './editableFields.css';

const EditableFields = () => {
  const [data, setData] = useState({
    field1: 'Value 1',
    field2: 'Value 2',
    field3: 'Value 3',
    field4: 'Value 4'
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    console.log('Saved data:', data);
    setEditMode(false);
  };

  return (
    <div className="container">
      {['field1', 'field2', 'field3', 'field4'].map((field, index) => (
        <div key={field} className="field-container">
          <label className="label" htmlFor={field}>
            {`Field ${index + 1}`}
          </label>
          {editMode ? (
            <input
              className="input"
              type="text"
              name={field}
              value={data[field]}
              onChange={handleChange}
            />
          ) : (
            <p className="field">{data[field]}</p>
          )}
        </div>
      ))}
      <div className="button-container">
        {editMode ? (
          <>
            <button className="button" onClick={handleSave}>Save</button>
            <button className="button" onClick={toggleEditMode}>Cancel</button>
          </>
        ) : (
          <button className="button" onClick={toggleEditMode}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default EditableFields;
