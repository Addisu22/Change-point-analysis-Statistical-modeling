import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [indicators, setIndicators] = useState({});
  const [startDate, setStartDate] = useState(new Date("2010-01-01"));
  const [endDate, setEndDate] = useState(new Date("2020-12-31"));

  const fetchData = async () => {
    const format = d => d.toISOString().split('T')[0];
    const start = format(startDate);
    const end = format(endDate);

    const res = await axios.get(`http://localhost:5000/api/log-return-price?start=${start}&end=${end}`);
    setData(res.data.data);

    const ind = await axios.get(`http://localhost:5000/api/indicators-price?start=${start}&end=${end}`);
    setIndicators(ind.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Filter data by select Date ranges</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={setStartDate} />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker selected={endDate} onChange={setEndDate} />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Volatility:</strong> {indicators.volatility}<br />
        <strong>Average Change:</strong> {indicators.average_change}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="LogReturn" stroke="#0d6efd" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
