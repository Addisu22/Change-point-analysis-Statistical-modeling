// // src/components/Indicators.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Indicators = () => {
//   const [indicators, setIndicators] = useState({});

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/indicators")
//       .then((res) => setIndicators(res.data))
//       .catch((err) => console.error("Failed to fetch indicators", err));
//   }, []);

//   return (
//     <div>
//       <h3>Oil Price Indicators</h3>
//       <ul>
//         <li><strong>Average Price:</strong> ${indicators.average_price}</li>
//         <li><strong>Volatility (Std Dev):</strong> {indicators.volatility}</li>
//       </ul>
//     </div>
//   );
// };

// export default Indicators;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// const Indicators = () => {
//   const [volatility, setVolatility] = useState([]);
//   const [avgPrice, setAvgPrice] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/indicators')
//       .then(res => {
//         const v = res.data.volatility;
//         const p = res.data.avg_price;
//         const combined = v.map((vVal, i) => ({
//           day: i,
//           Volatility: vVal,
//           AvgPrice: p[i] || null,
//         }));
//         setVolatility(combined);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Volatility and Average Price</h2>
//       <LineChart width={800} height={400} data={volatility}>
//         <XAxis dataKey="day" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <CartesianGrid stroke="#ccc" />
//         <Line type="monotone" dataKey="Volatility" stroke="#ff7300" />
//         <Line type="monotone" dataKey="AvgPrice" stroke="#387908" />
//       </LineChart>
//     </div>
//   );
// };

// export default Indicators;

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

