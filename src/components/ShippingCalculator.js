import React, { useState } from 'react';
import Chart from './Chart';
import LoginForm from './LoginForm';
import '../styles.css'; // Import the styles.css file

const ShippingCalculator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [freightRates, setFreightRates] = useState([]);
  const [packageSize, setPackageSize] = useState('');
  const [rate, setRate] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addFreightRate = () => {
    setFreightRates([...freightRates, { packageSize, rate: parseFloat(rate) }]);
    setPackageSize('');
    setRate('');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="shipping-calculator-container"> {/* Add the class name for container */}
          <h1>Admin Dashboard</h1>
          <div>
            <h2>Add Freight Rate</h2>
            <input
              type="text"
              placeholder="Package Size"
              value={packageSize}
              onChange={(e) => setPackageSize(e.target.value)}
            />
            <input
              type="number"
              placeholder="Shipping Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <button onClick={addFreightRate}>Add Rate</button>
          </div>
          <Chart freightRates={freightRates} />
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
