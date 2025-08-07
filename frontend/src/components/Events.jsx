// src/components/Events.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div>
      <h1>Key Events Affecting Oil Prices</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event_Type</th>
            <th>Severity</th>
            <th>Description</th>
             </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => (
            <tr key={idx}>
              <td>{event.Date}</td>
              <td>{event.Event_type}</td>
              <td>{event.Severity}</td>
              <td>{event.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
