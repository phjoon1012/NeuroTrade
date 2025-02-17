import React, { useState, useEffect } from "react";

import { Line, Bar } from "react-chartjs-2"; // ✅ Imported Bar
import "chart.js/auto";
import Header from "../LandingPage/Header";
import { runBacktest } from "../../api/backtestingApi";
import "./BacktestForm.css";
import axios from "axios";
import { fetchStrategies } from "../../api/strategiesApi";

const keyMetrics = {
  Start: "시작 시간",
  End: "종료 시간",
  Duration: "기간",
  "Return [%]": "총 수익률 [%]",
  "Sharpe Ratio": "샤프 지수",
  "# Trades": "총 거래 횟수",
  "Win Rate [%]": "승률 [%]",
  "Volatility (Ann.) [%]": "변동성",
};

const BacktestPage = () => {
  const [strategies, setStrategies] = useState([]); // ✅ Store fetched strategies
  const [params, setParams] = useState({
    ema_period: 200,
    rsi_period: 30,
    tp: 0.02,
    sl: 0.01,
  });
  const [result, setResult] = useState(null);
  const [equityData, setEquityData] = useState([]);
  const [plot, setPlot] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const [drawdownData, setDrawdownData] = useState([]); // ✅ Defined missing state
  const [tradeProfitData, setTradeProfitData] = useState([]); // ✅ Defined missing state
  const [cumulativeReturns, setCumulativeReturns] = useState([]); // ✅ Defined missing state

  useEffect(() => {
    const loadStrategies = async () => {
      try {
        const strategiesData = await fetchStrategies(); // ✅ Use API function
        setStrategies(strategiesData);
        console.log(strategiesData);

        if (strategiesData.length > 0) {
          setSelectedStrategy(strategiesData[0]); // ✅ Set default strategy
        }

        console.log("Strategies loaded:", strategiesData); // Debugging
      } catch (error) {
        console.error("Error loading strategies:", error);
      }
    };

    loadStrategies();
  }, []);

  useEffect(() => {
    if (plot) {
      console.log("✅ Injecting Plot HTML:", plot);
      document.getElementById("plot-container").innerHTML = plot;
    }
  }, [plot]);

  const handleSubmit = async () => {
    if (!selectedStrategy) {
      alert("Please select a strategy.");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        strategy: selectedStrategy.bot__name, // ✅ Send selected strategy
        ema_period: params.ema_period,
        rsi_period: params.rsi_period,
        tp: params.tp,
        sl: params.sl,
      };

      console.log(requestData);

      const data = await runBacktest(requestData);
      setResult(data.stats);
      setEquityData(data.equity_curve);
      setPlot(data.plot_html);
      console.log("plot: " + data.plot_html);
    } catch (error) {
      console.error("Error running backtest:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="backtest-container">
        <div className="backtest-container">
          <h2 className="backtest-title">전략 선택</h2>

          <div className="backtest-grid">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`backtest-card ${
                  selectedStrategy?.bot__name === strategy.bot__name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedStrategy(strategy)}
              >
                <h3 className="backtest-name">{strategy.bot__name}</h3>
                <p className="backtest-description">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Display Selected Strategy */}
        <div className="selected-strategy-container">
          <h3 className="selected-strategy">
            선택된 전략:{" "}
            {selectedStrategy ? selectedStrategy.bot__name : "로딩 중..."}
          </h3>
          <div>
            <button
              onClick={handleSubmit}
              className="backtest-btn"
              disabled={!selectedStrategy}
            >
              {loading ? "백테스팅 실행 중..." : "백테스팅 실행"}
            </button>
          </div>
        </div>

        {/* ✅ Results Section */}
        {result && (
          <div className="backtest-results">
            {/* ✅ Raw JSON Output (For Debugging) */}
            {/* ✅ Results Section */}
            {result && (
              <div className="backtest-results">
                <h3>백테스팅 결과</h3>

                {/* ✅ Metrics Table - Two Column Grid */}
                <div className="metrics-grid">
                  <div className="metrics-column">
                    <table className="metrics-table">
                      <tbody>
                        {Object.entries(keyMetrics)
                          .slice(
                            0,
                            Math.ceil(Object.entries(keyMetrics).length / 2)
                          )
                          .map(
                            ([key, label]) =>
                              result[key] !== undefined && (
                                <tr key={key}>
                                  <td className="table-key">{label}</td>
                                  <td className="table-value">
                                    {result[key] !== null ? result[key] : "N/A"}
                                  </td>
                                </tr>
                              )
                          )}
                      </tbody>
                    </table>
                  </div>

                  <div className="metrics-column">
                    <table className="metrics-table">
                      <tbody>
                        {Object.entries(keyMetrics)
                          .slice(
                            Math.ceil(Object.entries(keyMetrics).length / 2)
                          )
                          .map(
                            ([key, label]) =>
                              result[key] !== undefined && (
                                <tr key={key}>
                                  <td className="table-key">{label}</td>
                                  <td className="table-value">
                                    {result[key] !== null ? result[key] : "N/A"}
                                  </td>
                                </tr>
                              )
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ✅ 2x2 Grid Layout for Graphs */}
                <div className="charts-grid">
                  {/* Equity Curve */}
                  <div className="chart-box">
                    <h4>수익 곡선</h4>
                    <Line
                      data={{
                        labels: equityData.map((item) => item.Date),
                        datasets: [
                          {
                            label: "Equity Curve",
                            data: equityData.map((item) => item.Equity),
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.2)",
                            fill: true,
                          },
                        ],
                      }}
                    />
                  </div>

                  {/* Drawdown Curve */}
                  <div className="chart-box">
                    <h4>드로우다운</h4>
                    <Line
                      data={{
                        labels: drawdownData.map((item) => item.Date),
                        datasets: [
                          {
                            label: "Drawdown",
                            data: drawdownData.map((item) => item.Value),
                            borderColor: "red",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                            fill: true,
                          },
                        ],
                      }}
                    />
                  </div>

                  {/* Trade Profit Distribution */}
                  <div className="chart-box">
                    <h4>거래 수익 분포</h4>
                    <Bar
                      data={{
                        labels: tradeProfitData.map((_, i) => `Trade ${i + 1}`),
                        datasets: [
                          {
                            label: "Trade Profits",
                            data: tradeProfitData,
                            backgroundColor: "green",
                          },
                        ],
                      }}
                    />
                  </div>
                  
                  <div className="plot-container">
    <h4>📈 백테스트 결과 (Interactive Chart)</h4>
    <div id="plot-container" />
  </div>
                  {/* Cumulative Returns */}
                  <div className="chart-box">
                    <h4>누적 수익</h4>
                    <Line
                      data={{
                        labels: cumulativeReturns.map((_, i) => i),
                        datasets: [
                          {
                            label: "Cumulative Returns",
                            data: cumulativeReturns,
                            borderColor: "orange",
                            backgroundColor: "rgba(255, 165, 0, 0.2)",
                            fill: true,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BacktestPage;
