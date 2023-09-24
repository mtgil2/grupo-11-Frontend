import React, { useState } from 'react';

function NumericInput() {
  const [number, setNumber] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Ensure the input only accepts numbers
    if (!isNaN(value) && value.trim() !== '') {
      setNumber(value);
    } else {
      setNumber('');
    }
  };

  const handleButtonClick = () => {
    console.log(number);
  };

  return (
    <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input 
        type="text" 
        value={number} 
        onChange={handleInputChange}
        placeholder="Inserte un número."
      />
      <button onClick={handleButtonClick}>Agregar dinero</button>
    </div>
  );
}

export default NumericInput;
