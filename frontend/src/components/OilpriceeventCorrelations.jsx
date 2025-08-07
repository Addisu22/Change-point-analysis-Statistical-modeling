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
