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
      <li><button onClick={() => setActivePage("summaryindicators")}>Summary Indicators</button></li>
      <li><button onClick={() => setActivePage("dashboard")}>Dashboard</button></li>
      <li><button onClick={() => setActivePage("oilpriceeventcorrelations")}>OilpriceeventCorrelations</button></li>
      <li><button onClick={() => setActivePage("oilprices")}>Oil Prices</button></li>
    </ul>
  </nav>
);

export default Sidebar;
