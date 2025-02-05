import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import Header from "../LandingPage/Header";
import "./BacktestForm.css";  // Import custom styles

const BacktestForm = () => {
  const [params, setParams] = useState({
    ema_period: 200,
    rsi_period: 30,
    tp: 0.02,
    sl: 0.01
  });

  const [result, setResult] = useState(null);
  const [equityData, setEquityData] = useState([]);

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/backtesting/run/", params);
      setResult(response.data.stats);
      setEquityData(response.data.equity_curve);
    } catch (error) {
      console.error("Error running backtest:", error);
    }
  };

  const chartData = {
    labels: equityData.map(item => item.Date),
    datasets: [
      {
        label: "Equity Curve",
        data: equityData.map(item => item.Equity),
        borderColor: "#1b5fc6",
        backgroundColor: "rgba(27, 95, 198, 0.1)",
        fill: true,
        tension: 0.2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: "Date" }, ticks: { color: "#333" } },
      y: { title: { display: true, text: "Equity ($)" }, ticks: { color: "#333" } }
    }
  };

  return (
    <div>
      <Header />
      <div className="backtest-container">
        <h2>백테스팅 매개변수 입력</h2>
        <form onSubmit={handleSubmit} className="backtest-form">
          <label>EMA 기간:<input type="number" name="ema_period" value={params.ema_period} onChange={handleChange} /></label>
          <label>RSI 기간:<input type="number" name="rsi_period" value={params.rsi_period} onChange={handleChange} /></label>
          <label>이익 실현 (%):<input type="number" step="0.01" name="tp" value={params.tp} onChange={handleChange} /></label>
          <label>손절매 (%):<input type="number" step="0.01" name="sl" value={params.sl} onChange={handleChange} /></label>
          <button type="submit">백테스팅 실행</button>
        </form>

        {result && (
          <div className="backtest-results">
            <h3>백테스팅 결과</h3>
            <div className="result-cards">
  <div className="result-card">
    <h4>최종 자산</h4>
    <p>{result["Equity Final [$]"] !== null ? `$${result["Equity Final [$]"].toFixed(2)}` : "데이터 없음"}</p>
  </div>

  <div className={`result-card ${result["Return [%]"] > 0 ? 'positive' : 'negative'}`}>
    <h4>수익률</h4>
    <p>{result["Return [%]"] !== null ? `${result["Return [%]"].toFixed(2)}%` : "데이터 없음"}</p>
  </div>

  <div className="result-card">
    <h4>최대 손실</h4>
    <p>{result["Max. Drawdown [%]"] !== null ? `${result["Max. Drawdown [%]"].toFixed(2)}%` : "데이터 없음"}</p>
  </div>

  <div className="result-card">
    <h4>총 거래 수</h4>
    <p>{result["# Trades"] !== null ? result["# Trades"] : "데이터 없음"}</p>
  </div>

  <div className="result-card">
    <h4>승률</h4>
    <p>{result["Win Rate [%]"] !== null ? `${result["Win Rate [%]"].toFixed(2)}%` : "N/A"}</p>
  </div>
</div>

{/* Raw JSON Display */}
<div className="raw-json">
  <h3>Raw JSON 데이터</h3>
  <pre>{JSON.stringify(result, null, 2)}</pre>
</div>

            {equityData.length > 0 && (
              <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BacktestForm;