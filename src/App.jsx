import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PriceBox from "./components/PriceBox";
import RatioBox from "./components/RatioBox";
import Footer from "./components/Footer";
import InfoBox from "./components/InfoBox"
import HistoricalChart from './components/HistoricalChart';
import './index.css';


function App() {

  const fetchMetalPrices = async () => {
    const symbols = ["XAU", "XAG"];

    try {
      const responses = await Promise.all(
        symbols.map(symbol => fetch(`/api/fetch-data?targetSymbol=${symbol}`))
      );

      const [goldData, silverData] = await Promise.all(
        responses.map(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${res.url}`);
          return res.json();
        })
      );

      console.log("Prices Synced:", { goldData, silverData });
      return { goldData, silverData };

    } catch (error) {
      console.error("Backend Error:", error);
    }
  };

  const [prices, setPrices] = useState({ gold: null, silver: null, loading: true });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMetalPrices();
      if (data) {
        setPrices({
          gold: data.goldData,
          silver: data.silverData,
          loading: false
        });
      }
    };

    loadData();
  }, []);

  const gold_silver_ratio = {
    gold_silver_ratio: 59,
    status: "silver_underpriced"
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-ibm">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PriceBox priceData={prices.gold} />
        <PriceBox priceData={prices.silver} />
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
