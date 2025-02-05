import React from "react";
import "./LandingPage.css";

const NeuroTradePitch = () => {
  return (
    <section className="neurotrade-pitch">
      <h2>AI 기반 자동화 트레이딩 플랫폼, <span className="highlight">NeuroTrade</span></h2>
      <p>
        NeuroTrade는 첨단 인공지능 기술을 활용하여 시장 변동을 실시간으로 분석하고, 자동으로 최적의 거래를 실행합니다. 빠르고 정확한 의사결정으로 안정적이고 꾸준한 수익을 제공합니다.
      </p>
      <div className="features-container">
        <div className="feature">
          <h3>강력한 AI 알고리즘</h3>
          <p>
            NeuroTrade의 AI 알고리즘은 시장 데이터를 분석하여 최고의 투자 기회를 포착하고, 최적의 매수·매도 시점을 자동으로 결정합니다.
          </p>
        </div>
        <div className="feature">
          <h3>리스크 관리 최적화</h3>
          <p>
            AI 기반의 고급 리스크 관리 시스템을 통해 시장 변동성에 효과적으로 대응하고, 자산 손실을 최소화합니다.
          </p>
        </div>
        <div className="feature">
          <h3>사용자 맞춤 전략</h3>
          <p>
            각 사용자의 투자 성향에 맞춘 다양한 전략을 제공하며, 원하는 방식으로 자동화된 트레이딩을 설정할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NeuroTradePitch;