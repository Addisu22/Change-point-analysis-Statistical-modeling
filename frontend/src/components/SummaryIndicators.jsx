import React, { useEffect, useState } from "react";
import axios from "axios";

const SummaryIndicators = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/summary")
      .then(res => {
        if (res.data.status === "success") {
          setSummary(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Summary Indicators</h2>
      {summary ? (
        <ul>
          <li><strong>Average Return:</strong> {summary.average_return.toFixed(5)}</li>
          <li><strong>Volatility:</strong> {summary.volatility.toFixed(5)}</li>
          <li><strong>Max Return:</strong> {summary.max_return.toFixed(5)}</li>
          <li><strong>Min Return:</strong> {summary.min_return.toFixed(5)}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SummaryIndicators;

