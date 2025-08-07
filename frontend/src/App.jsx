// Main Bar
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Overview from "./components/Overview";
import Events from "./components/Events";
import Indicators from "./components/Indicators";
import SummaryIndicators from "./components/SummaryIndicators";
import Dashboard  from "./components/Dashboard";
import OilpriceeventCorrelations from "./components/OilpriceeventCorrelations";
import OilPrices from "./components/OilPrices";

const App = () => {
  const [activePage, setActivePage] = useState("overview");

  const renderContent = () => {
    switch (activePage) {
      case "overview": return <Overview />;
      case "events": return <Events />;
      case "indicators": return <Indicators />;
      case "summaryindicators": return <SummaryIndicators />;
      case "dashboard": return<Dashboard />;
      case "OilpriceeventCorrelations": return<OilpriceeventCorrelations />;
      case "oilprices": return <OilPrices />;
      default: return <Overview />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar setActivePage={setActivePage} />
        <main style={{ flex: 1, padding: "20px" }}>
          {renderContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
