// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Overview = () => {
//   const [changeData, setChangeData] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/changepoint')
//       .then(res => setChangeData(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   if (!changeData) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Change Point Analysis Overview</h2>
//       <p><strong>Estimated Change Point Date:</strong> {changeData.change_point_date}</p>
//       <p><strong>μ₁ (Before Change):</strong> {changeData.mu1.toFixed(5)}</p>
//       <p><strong>μ₂ (After Change):</strong> {changeData.mu2.toFixed(5)}</p>
//       <p>
//         <strong>Interpretation:</strong>{' '}
//         The Brent oil market behavior changed around <b>{changeData.change_point_date}</b>.
//         The average return shifted from <b>{changeData.mu1.toFixed(5)}</b> to <b>{changeData.mu2.toFixed(5)}</b>,
//         indicating a structural shift.
//       </p>
//     </div>
//   );
// };

// export default Overview;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/changepoint")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Change Point Overview</h2>
      <p><strong>Change Point:</strong> {data.change_point_date}</p>
      <p>μ₁ (Before): {data.mu1}</p>
      <p>μ₂ (After): {data.mu2}</p>
    </div>
  );
};

export default Overview;
