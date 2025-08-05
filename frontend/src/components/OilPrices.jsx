import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OilPrices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/prices")
         .then(res => setPrices(res.data));
  }, []);

  return (
    <div>
      <h3>Oil Prices</h3>
      <table border={1}>
        <thead><tr><th>Date</th><th>Price</th></tr></thead>
        <tbody>
          {prices.map((row, idx) => (
            <tr key={idx}>
              <td>{row.Date}</td>
              <td>{row.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OilPrices;
