// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const LogReturnsChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);  // 👈 loading state
//   const [error, setError] = useState(null);      // 👈 error state

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/log-return")
//       .then(res => {
//         if (res.data.status === "success") {
//           setData(res.data.data.map(d => ({
//             ...d,
//             Date: new Date(d.Date).toISOString().split('T')[0]
//           })));
//           setLoading(false);
//         } else {
//           setError("Unexpected response structure");
//           setLoading(false);
//         }
//       })
//       .catch(err => {
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading log return data...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div style={{ width: "100%", height: 400 }}>
//       <h2>Log Return Over Time</h2>
//       <ResponsiveContainer>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Date" />
//           <YAxis domain={['auto', 'auto']} />
//           <Tooltip />
//           <Line type="monotone" dataKey="LogReturn" stroke="#0d6efd" dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LogReturnsChart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LogReturnsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/log-return")
      .then(res => {
        if (res.data.status === "success") {
          const formatted = res.data.data.map(d => ({
            ...d,
            Date: new Date(d.Date).toISOString().split('T')[0]
          }));
          setData(formatted);
        } else {
          console.error("API Error:", res.data.message);
        }
      })
      .catch(err => console.error("Request Error:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Log Returns Over Time</h2>
      <ResponsiveContainer>
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

export default LogReturnsChart;
