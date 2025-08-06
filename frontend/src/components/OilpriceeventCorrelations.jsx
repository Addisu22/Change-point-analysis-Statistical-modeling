// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, ResponsiveContainer } from 'recharts';

// function OilpriceeventCorrelations() {
//   const [oilData, setOilData] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [correlations, setCorrelations] = useState([]);

//   useEffect(() => {
//     // Fetch data from Flask backend
//     fetch('http://localhost:5000/api/prices')
//       .then(res => res.json())
//       .then(data => setOilData(data));

//     fetch('http://localhost:5000/api/events')
//       .then(res => res.json())
//       .then(data => setEvents(data));

//     fetch('http://localhost:5000/api/price_changes_around_events')
//       .then(res => res.json())
//       .then(data => setCorrelations(data));
//   }, []);

//   // Combine events with oil data for the chart
//   const chartData = oilData.map(day => {
//     const event = events.find(e => e.date === day.date);
//     return {
//       ...day,
//       event: event ? event.type : null,
//       eventDescription: event ? event.description : null
//     };
//   });

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Oil Prices & Events Correlation</h1>
      
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//         {/* Price Trend with Event Markers */}
//         <div style={{ width: '600px', height: '400px' }}>
//           <h3>Price Trend with Events</h3>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="price" stroke="#8884d8" />
//               <Scatter dataKey="price" fill="red" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Event Impact Analysis */}
//         <div style={{ width: '400px', height: '400px' }}>
//           <h3>Event Impact on Prices</h3>
//           <ResponsiveContainer width="100%" height="100%">
//             <ScatterChart data={correlations}>
//               <CartesianGrid />
//               <XAxis dataKey="type" name="Event Type" />
//               <YAxis dataKey="price_change" name="Price Change ($)" />
//               <Tooltip formatter={(value, name, props) => [
//                 `$${value.toFixed(2)}`, 
//                 props.payload.description
//               ]}/>
//               <Scatter name="Events" dataKey="price_change" fill="#8884d8" />
//             </ScatterChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Events Table */}
//       <div style={{ marginTop: '40px' }}>
//         <h3>Key Events</h3>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Description</th>
//               <th>Price Impact</th>
//             </tr>
//           </thead>
//           <tbody>
//             {correlations.map((event, i) => (
//               <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
//                 <td>{event.date}</td>
//                 <td>{event.type}</td>
//                 <td>{event.description}</td>
//                 <td style={{ color: event.price_change > 0 ? 'green' : 'red' }}>
//                   {event.price_change > 0 ? '+' : ''}{event.price_change.toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default OilpriceeventCorrelations;


import React, { useEffect, useState } from "react";

const OilpriceeventCorrelations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/price_changes_around_events_filtered")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Oil Price Changes Around Events</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Price on Day</th>
            <th>Change from $65</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.Event}</td>
              <td>{item.Date}</td>
              <td>{item.Price_on_day}</td>
              <td>{item.Price_change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OilpriceeventCorrelations;
