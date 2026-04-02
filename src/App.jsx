import React from "react";
import Header from "./components/Header";
import PriceBox from "./components/PriceBox";
import RatioBox from "./components/RatioBox";
import Footer from "./components/Footer";
import InfoBox from "./components/InfoBox"
import HistoricalChart from './components/HistoricalChart';
import './index.css';


function App() {
  const goldPriceData = {
    metal: "Gold",
    price_inr: 14500,   // per 10 grams (24K approx)
    change_24h: 1.2      // example recent daily movement (positive trend)
  };

  const silverPriceData = {
    metal: "Silver",
    price_inr: 245,   // per kilogram
    change_24h: -2.4      // mostly flat in latest data
  };

  const gold_silver_ratio = {
    gold_silver_ratio: 59,  // 145000 / 2450 (per 10g vs 10g equivalent silver)
    status: "silver_underpriced" // silver relatively cheaper vs gold historically
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-ibm">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PriceBox priceData={goldPriceData} />
        <PriceBox priceData={silverPriceData} />
        <RatioBox ratioData={gold_silver_ratio} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HistoricalChart ratioData={gold_silver_ratio} />
        </div>
        <div className="w-full">
          <InfoBox />
        </div>
        {/* <InfoBox /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
