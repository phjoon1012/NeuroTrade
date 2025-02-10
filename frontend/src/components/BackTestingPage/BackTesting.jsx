import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Header from "../LandingPage/Header";
import { runBacktest } from "../../api/backtestingApi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BacktestForm.css";

// Placeholder strategies
const strategies = [
  { id: 1, name: "MACD Strategy", description: "Uses MACD crossover signals.", image: "/images/macd.png" },
  { id: 2, name: "RSI Strategy", description: "Buy when oversold, sell when overbought.", image: "/images/rsi.png" },
  { id: 3, name: "Bollinger Bands", description: "Trades based on volatility.", image: "/images/bollinger.png" },
];

const BacktestPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [params, setParams] = useState({ ema_period: 200, rsi_period: 30, tp: 0.02, sl: 0.01 });
  const [result, setResult] = useState(null);
  const [equityData, setEquityData] = useState([]);
  const [plot, setPlot] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const handleSubmit = async () => {
    setLoading(true); // Show loader while fetching
    try {
      const data = await runBacktest(params);
      setResult(data.stats);
      setEquityData(data.equity_curve);
      setPlot(data.plot);
    } catch (error) {
      console.error("Error running backtest:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div>
      <Header />
      <div className="backtest-container">
        <h2>선택 전략 & 백테스팅 실행</h2>

        {/* ✅ Strategy Selection */}
        <div className="strategy-selection">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => setSelectedStrategy(strategies[swiper.activeIndex])}
            className="strategy-carousel"
          >
            {strategies.map((strategy) => (
              <SwiperSlide key={strategy.id}>
                <div className="strategy-card">
                  <img src={strategy.image} alt={strategy.name} className="strategy-image" />
                  <h3>{strategy.name}</h3>
                  <p>{strategy.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ Display Selected Strategy */}
        <div className="selected-strategy-container">
          <h3 className="selected-strategy">선택된 전략: {selectedStrategy.name}</h3>
          <div>
            <button onClick={handleSubmit} className="backtest-btn">
            {loading ? "백테스팅 실행 중..." : "백테스팅 실행"}
          </button>
          </div>
          
        </div>

        {/* ✅ Results Section */}
        {result && (
          <div className="backtest-results">
            <h3>백테스팅 결과</h3>

            {/* ✅ Chart Section */}
            {plot && (
              <div className="chart-container">
                <h4>백테스트 차트</h4>
                <img src={plot} alt="Backtest Chart" className="backtest-chart" />
              </div>
            )}

            {equityData.length > 0 && (
              <div className="chart-container">
                <h4>수익 곡선</h4>
                <Line
                  data={{
                    labels: equityData.map((item) => item.Date),
                    datasets: [
                      {
                        data: equityData.map((item) => item.Equity),
                        label: "Equity Curve",
                        borderColor: "#1b5fc6",
                        backgroundColor: "rgba(27, 95, 198, 0.1)",
                        fill: true,
                        tension: 0.2,
                      },
                    ],
                  }}
                />
              </div>
            )}

            {/* ✅ Raw JSON Output (For Debugging) */}
            <div className="raw-json">
              <h3>백테스트 데이터</h3>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BacktestPage;