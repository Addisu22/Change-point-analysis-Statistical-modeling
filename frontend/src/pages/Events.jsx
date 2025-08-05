import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then(res => {
      setEvents(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Key Events Influencing Oil Prices</h2>
      <ul>
        {events.map((event, idx) => (
          <li key={idx}>
            <strong>{event.date}:</strong> {event.event}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
