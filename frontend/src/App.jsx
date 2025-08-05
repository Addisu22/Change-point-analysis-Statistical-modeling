// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// // export default App
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import reactLogo from './assets/Logo.svg'
// import Sidebar from './components/Sidebar';
// import OilPrices from './components/OilPrices';
// import Events from './components/Events';
// import Indicators from './components/Indicators';

// const App = () => (
//   <Router>
//     <a href="https://react.dev" target="_blank">
//            <img src={reactLogo} className="logo react" alt="React logo" />
//        </a>
//     <Sidebar />
//     <div style={{ marginLeft: '300px', padding: '0px' }}>
//       <Routes>
//         <Route path="/" element={<OilPrices />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/indicators" element={<Indicators />} />
//       </Routes>
//     </div>
//   </Router>
// );

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Overview from "./pages/Overview";
import OilPrices from "./pages/OilPrices";
import Events from "./pages/Events";
import Indicators from "./pages/Indicators";

const App = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <nav style={{ width: "200px", padding: "20px", background: "#eee" }}>
        <h3>Dashboard Menu</h3>
        <ul>
          <li><Link to="/">Overview</Link></li>
          <li><Link to="/oil-prices">Oil Prices</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/indicators">Indicators</Link></li>
        </ul>
      </nav>

      <main style={{ padding: "20px", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/oil-prices" element={<OilPrices />} />
          <Route path="/events" element={<Events />} />
          <Route path="/indicators" element={<Indicators />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
