import React, { useState } from 'react';
import axios from 'axios';

const NumberFetcher = () => {
  const [numberType, setNumberType] = useState('p');
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [currentNumbers, setCurrentNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/numbers/${numberType}`);
      setPreviousNumbers(response.data.previous_numbers);
      setCurrentNumbers(response.data.current_numbers);
      setAverage(response.data.average);
    } catch (err) {
      setError('Error fetching numbers. Please try again.');
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <label htmlFor="numberType">Select Number Type: </label>
        <select id="numberType" value={numberType} onChange={(e) => setNumberType(e.target.value)}>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {error && <p>{error}</p>}
      <div>
        <h2>Previous Numbers</h2>
        <p>{previousNumbers.join(', ')}</p>
        <h2>Current Numbers</h2>
        <p>{currentNumbers.join(', ')}</p>
        <h2>Average</h2>
        <p>{average}</p>
      </div>
    </div>
  );
};

export default NumberFetcher;
