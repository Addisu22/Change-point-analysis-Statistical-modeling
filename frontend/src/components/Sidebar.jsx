import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div style={{
    width: '200px', height: '100vh', position: 'fixed',
    background: '#222', color: '#fff', padding: '20px'
  }}>
    <h3>Interactive Dashboard</h3>
    <ul>
      <li><Link to="/">Oil Prices</Link></li>
      <li><Link to="/events">Key Events</Link></li>
      <li><Link to="/indicators">Indicators</Link></li>
    </ul>
  </div>
);

export default Sidebar;
