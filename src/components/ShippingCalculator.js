import React, { useState } from 'react';
import Chart from './Chart';
import LoginForm from './LoginForm';
import '../styles.css'; // Import the styles.css file
import Select from 'react-select'; // Import the react-select component
import IndiaCities from '../data/India-city-names.json'; // Import the India city data
import USCities from '../data/US_States_and_Cities.json'; // Import the US city data

const ShippingCalculator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [freightRates, setFreightRates] = useState([]);
  const [packageSize, setPackageSize] = useState('');
  const [destination, setDestination] = useState(null);
  const [rate, setRate] = useState('');
  const [packageWeightUnit, setPackageWeightUnit] = useState('kg');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addFreightRate = () => {
    if (!packageSize || !destination || !rate) {
      alert('Please fill in all the fields.');
      return;
    }

    const currency = packageWeightUnit === 'kg' ? 'inr' : 'usd';

    const newRate = { packageSize, destination: destination.label, rate: parseFloat(rate), currency, packageWeightUnit};
    setFreightRates([...freightRates, newRate]);

    setPackageSize('');
    setDestination(null); // Reset the destination to null after adding the rate
    setRate('');
  };

  // Get the appropriate cityOptions based on the selected package weight unit
  const getCityOptions = () => {
    if (packageWeightUnit === 'kg') {
      return Object.keys(IndiaCities).flatMap((country) =>
        IndiaCities[country].map((city) => ({ value: `${city}, ${country}`, label: `${city}, ${country}` }))
      );
    } else {
      return Object.keys(USCities).flatMap((state) =>
        USCities[state].map((city) => ({ value: `${city}, ${state}`, label: `${city}, ${state}` }))
      );
    }
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
            <form>
              <div className="package-weight-container">
                <input
                  type="text"
                  placeholder="Package Weight"
                  value={packageSize}
                  onChange={(e) => setPackageSize(e.target.value)}
                  className="package-size-input"
                />
                <select
                  className="select"
                  value={packageWeightUnit}
                  onChange={(e) => setPackageWeightUnit(e.target.value)}
                >
                  <option value="kg">KG</option>
                  <option value="lb">LB</option>
                </select>
              </div>
              <div className="city-state-dropdown">
                <Select
                  options={getCityOptions()} // Use the filtered cityOptions based on package weight unit
                  value={destination}
                  onChange={(selectedOption) => setDestination(selectedOption)}
                  placeholder="Select City and State"
                />
              </div>
              <br />
              <div className="shipping-rate-input">
                <input
                  type="text"
                  placeholder="Shipping Rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <select
                  className="select2"
                  value={packageWeightUnit === 'kg' ? 'inr' : 'usd'}
                  onChange={(e) => setPackageWeightUnit(e.target.value === 'inr' ? 'kg' : 'lb')}
                >
                  <option value="inr" className="inr-option">
                    INR
                  </option>
                  <option value="usd" className="usd-option">
                    USD
                  </option>
                </select>
              </div>
              <button type="button" onClick={addFreightRate}>
                Add Rate
              </button>
            </form>
          </div>
          <Chart freightRates={freightRates} packageWeightUnit={packageWeightUnit} />
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
