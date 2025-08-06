// src/components/Indicators.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Indicators = () => {
  const [indicators, setIndicators] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/indicators")
      .then((res) => setIndicators(res.data))
      .catch((err) => console.error("Failed to fetch indicators", err));
  }, []);

  return (
    <div>
      <h3>Oil Price Indicators: Key Indicators</h3>
      <ul>
        <li><strong>Average Price:</strong> ${indicators.average_price}</li>
        <li><strong>Volatility (Std Dev):</strong> {indicators.volatility}</li>
      </ul>
    </div>
  );
};

export default Indicators;