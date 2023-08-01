import React, { useState } from 'react';
import Chart from './Chart';
import LoginForm from './LoginForm';
import '../styles.css'; // Import the styles.css file

const ShippingCalculator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [freightRates, setFreightRates] = useState([]);
  const [packageSize, setPackageSize] = useState('');
  const [destination, setDestination] = useState('');
  const [rate, setRate] = useState('');
  const [packageWeightUnit, setPackageWeightUnit] = useState('kg'); // Add package weight unit state

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addFreightRate = () => {
    if (!packageSize || !destination || !rate) {
      alert('Please fill in all the fields.');
      return;
    }

    // Determine the currency based on the package weight unit
    const currency = packageWeightUnit === 'kg' ? 'inr' : 'usd';

    // Create a new rate object and add it to the existing rates array
    const newRate = { packageSize, destination, rate: parseFloat(rate), currency };
    setFreightRates([...freightRates, newRate]);
    setPackageSize('');
    setDestination('');
    setRate('');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="shipping-calculator-container">
          <h1>Admin Dashboard</h1>
          <div>
            <h2>Add Freight Rate</h2>
            <div className="package-input">
              <input
                type="text"
                placeholder="Package Weight"
                value={packageSize}
                onChange={(e) => setPackageSize(e.target.value)}
              />
              {/* Add the dropdown for package weight unit selection */}
              <select value={packageWeightUnit} onChange={(e) => setPackageWeightUnit(e.target.value)}>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <div className="shipping-rate-input">
              <input
                type="text"
                placeholder="Shipping Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              {/* Add the dropdown for currency selection */}
              <select value={packageWeightUnit === 'kg' ? 'inr' : 'usd'} onChange={(e) => setPackageWeightUnit(e.target.value === 'inr' ? 'kg' : 'lb')}>
                <option value="inr">INR</option>
                <option value="usd">USD</option>
              </select>
            </div>
            <button onClick={addFreightRate}>Add Rate</button>
          </div>
          {/* Pass the freightRates to the Chart component */}
          <Chart freightRates={freightRates} />
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
