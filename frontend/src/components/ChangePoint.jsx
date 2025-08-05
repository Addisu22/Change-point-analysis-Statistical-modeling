import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChangePoint = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/changepoints')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Change Point Detection Result</h2>
      <p><strong>Date of Change:</strong> {data.change_point_date}</p>
      <p><strong>Change Point Index:</strong> {data.change_point_index}</p>
      <p><strong>Mean Before (μ1):</strong> {data.mu1.toFixed(4)}</p>
      <p><strong>Mean After (μ2):</strong> {data.mu2.toFixed(4)}</p>
    </div>
  );
};

export default ChangePoint;
