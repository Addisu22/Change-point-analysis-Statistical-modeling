import React from "react";

// const Header = () => (
//   <header style={{
//     backgroundColor: "#0d6efd",
//     color: "white",
//     padding: "15px 30px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between"
//   }}>
//     <img src="/Logo.png" alt="Logo" height="80" />
//     <h1 style={{ margin: 0 }}>Brent Oil Price Interactive Dashboard</h1>
//   </header>
// );

const Header = () => (
  <header style={{
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "15px 0",
  }}>
    <div style={{
      maxWidth: "auto",
      margin: "0 auto",
      padding: "0 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <img src="/Logo.png" alt="Logo" height="80" />
      <h1 style={{ margin: 0 }}>                Brent Oil Price: Developing an Interactive Dashboard for Data Analysis </h1>
    </div>
  </header>
);
export default Header;
