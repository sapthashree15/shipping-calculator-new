// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // If you have a custom CSS file, import it here.
import ShippingCalculator from './App'; // Replace './App' with the path to your main component file.

ReactDOM.render(
  <React.StrictMode>
    <ShippingCalculator />
  </React.StrictMode>,
  document.getElementById('root')
);
