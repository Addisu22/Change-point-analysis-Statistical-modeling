import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const OilPrices = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/prices')
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Brent Oil Prices</h2>
      <LineChart width={1000} height={450} data={data}>
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="Price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default OilPrices;
