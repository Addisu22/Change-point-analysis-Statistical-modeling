import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/changepoint")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Change Point Overview</h2>
      <p><strong>Change Point:</strong> {data.change_point_date}</p>
      <p>μ₁ (Before): {data.mu1}</p>
      <p>μ₂ (After): {data.mu2}</p>
    </div>
  );
};

export default Overview;
