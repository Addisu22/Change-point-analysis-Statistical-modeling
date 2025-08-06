const API_BASE = 'http://localhost:5000/api';

export const fetchHistoricalPrices = async (startDate, endDate) => {
  const response = await fetch(
    `${API_BASE}/historical-prices?start_date=${startDate}&end_date=${endDate}`
  );
  return response.json();
};

export const fetchVolatility = async (window = 30) => {
  const response = await fetch(`${API_BASE}/volatility?window=${window}`);
  return response.json();
};

export const fetchEvents = async (eventType = 'all', severity = 'all') => {
  const response = await fetch(
    `${API_BASE}/events?event_type=${eventType}&severity=${severity}`
  );
  return response.json();
};

export const fetchEventImpacts = async (daysBefore = 7, daysAfter = 30) => {
  const response = await fetch(
    `${API_BASE}/event-impacts?days_before=${daysBefore}&days_after=${daysAfter}`
  );
  return response.json();
};

export const fetchEventTypes = async () => {
  const response = await fetch(`${API_BASE}/event-types`);
  return response.json();
};

export const fetchSeverityLevels = async () => {
  const response = await fetch(`${API_BASE}/severity-levels`);
  return response.json();
};