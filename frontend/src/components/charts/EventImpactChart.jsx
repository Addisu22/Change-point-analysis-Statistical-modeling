import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import './chartStyles.css';

const EventImpactChart = ({ events, impacts, title }) => {
  if (!impacts || impacts.length === 0) {
    return <div className="no-data">No impact data available</div>;
  }

  // Prepare data for scatter plot
  const impactData = impacts.map(impact => ({
    ...impact,
    impactMagnitude: Math.abs(impact.avg_impact),
    impactDirection: impact.avg_impact > 0 ? 'Increase' : 'Decrease'
  }));

  return (
    <div className="chart-wrapper">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis 
            type="category" 
            dataKey="event_type" 
            name="Event Type"
            angle={-45}
            textAnchor="end"
            height={60}
          >
            <Label value="Event Type" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis 
            type="number" 
            dataKey="avg_impact" 
            name="Average Impact (USD)" 
            label={{ value: 'Average Impact (USD)', angle: -90, position: 'insideLeft' }}
          />
          <ZAxis 
            type="number" 
            dataKey="impactMagnitude" 
            range={[60, 400]} 
            name="Impact Magnitude"
          />
          <Tooltip 
            formatter={(value, name, props) => {
              if (name === 'avg_impact') return [`$${value.toFixed(2)}`, 'Average Impact'];
              if (name === 'severity') return [value, 'Severity'];
              return [value, name];
            }}
            labelFormatter={(label) => `Event: ${label}`}
          />
          <Legend />
          <Scatter
            name="Price Impact"
            data={impactData}
            fill="#8884d8"
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventImpactChart;