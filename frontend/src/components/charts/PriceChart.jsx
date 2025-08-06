import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chartStyles.css';

const PriceChart = ({ data, title }) => {
  if (!data) return <div className="no-data">No price data available</div>;

  const chartData = data.dates.map((date, index) => ({
    date,
    price: data.prices[index],
    ma7: data.moving_averages['7_day'][index],
    ma30: data.moving_averages['30_day'][index]
  }));

  return (
    <div className="chart-wrapper">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip 
            formatter={(value, name) => [value.toFixed(2), name]}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            name="Price (USD)" 
            stroke="#8884d8" 
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="ma7" 
            name="7-day MA" 
            stroke="#82ca9d" 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="ma30" 
            name="30-day MA" 
            stroke="#ffc658" 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;