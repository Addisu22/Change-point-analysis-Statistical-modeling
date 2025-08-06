import React from "react";

const Footer = () => {
  const date = new Date().toLocaleDateString();

  return (
    <footer style={{
      width: "100%", // Make it span full width
      backgroundColor: "#f1f1f1",
      padding: "10px",
      textAlign: "center",
      borderTop: "1px solid #ccc"
    }}>
      <p>© {date} | 10 Academy | All rights reserved.</p>
    </footer>
  );
};

export default Footer;
