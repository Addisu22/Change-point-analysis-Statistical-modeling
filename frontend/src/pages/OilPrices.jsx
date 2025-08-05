import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const OilPrices = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/prices").then(res => {
      setData(res.data);
    });
  }, []);

  const chartData = {
    labels: data.map(item => new Date(item.Date).toLocaleDateString()),
    datasets: [
      {
        label: "Brent Oil Price (USD)",
        data: data.map(item => item.Price),
        fill: false,
        borderColor: "blue",
      },
    ],
  };

  return (
    <div>
      <h2>Oil Price Trend</h2>
      <Line data={chartData} />
    </div>
  );
};

export default OilPrices;
