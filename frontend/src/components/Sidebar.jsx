// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => (
//   <div style={{
//     width: '200px', height: '100vh', position: 'fixed',
//     background: '#222', color: '#fff', padding: '20px'
//   }}>
//     <h3>Interactive Dashboard</h3>
//     <ul>
//       <li><Link to="/">Oil Prices</Link></li>
//       <li><Link to="/events">Key Events</Link></li>
//       <li><Link to="/indicators">Indicators</Link></li>
//     </ul>
//   </div>
// );

// export default Sidebar;

import React from "react";

const Sidebar = ({ setActivePage }) => (
  <nav style={{
    width: "220px",
    background: "#f8f9fa",
    padding: "20px",
    borderRight: "1px solid #dee2e6"
  }}>
    <h3>Navigation</h3>
    <ul style={{ listStyle: "none", padding: 0 }}>
      <li><button onClick={() => setActivePage("overview")}>Overview</button></li>
      <li><button onClick={() => setActivePage("events")}>Key Events</button></li>
      <li><button onClick={() => setActivePage("indicators")}>Indicators</button></li>
      <li><button onClick={() => setActivePage("summaryindicators")}>SummaryIndicators</button></li>
      <li><button onClick={() => setActivePage("Dashboard")}>Dashboard</button></li>
      <li><button onClick={() => setActivePage("oilprices")}>Oil Prices</button></li>
    </ul>
  </nav>
);

export default Sidebar;
