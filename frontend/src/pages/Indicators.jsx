import React, { useEffect, useState } from "react";
import axios from "axios";

const Indicators = () => {
  const [indicators, setIndicators] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/indicators").then(res => {
      setIndicators(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Oil Price Indicators</h2>
      <p><strong>Volatility:</strong> {indicators.volatility}</p>
      <p><strong>Average Price:</strong> ${indicators.average_price}</p>
    </div>
  );
};

export default Indicators;
