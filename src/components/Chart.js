import React from 'react';

const Chart = ({ freightRates, packageWeightUnit }) => {
  return (
    <div className="chart-container">
      <h2>Shipping Rate Chart</h2>
      <table>
        <thead>
          <tr>
            <th>Package Weight</th>
            <th>Destination</th>
            <th>Shipping Rate</th>
          </tr>
        </thead>
        <tbody>
          {freightRates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.packageSize} ({rate.packageWeightUnit})</td>
              <td>{rate.destination}</td>
              <td>{`${rate.currency === 'usd' ? '$' : '₹'}${rate.rate.toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chart;
