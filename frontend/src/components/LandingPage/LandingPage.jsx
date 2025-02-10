import React from "react";
import Header from "./Header";
import CoinPrices from "./CoinPrices";
import NeuroTradePitch from "./NeuroTradePitch";
import "./LandingPage.css";
import HeroSection from "./HeroSection";
import KeyFeatures from "./KeyFeatures";
import CandlestickChart from "./ChartComponent";


const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      {/* <CoinPrices /> */}
      <NeuroTradePitch />
      <KeyFeatures/>
    </div>
  );
};

export default LandingPage;