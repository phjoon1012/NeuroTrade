import React from "react";
import "./LandingPage.css";

const KeyFeatures = () => {
  return (
    <section className="key-features">
  <h2>NeuroTrade의 핵심 기능</h2>
  
  <div className="features-grid">
    <div className="feature-block">
      <h3>실시간 데이터 분석</h3>
      <p>NeuroTrade는 실시간으로 시장 데이터를 수집하고 분석하여 빠르고 정확한 의사 결정을 지원합니다.</p>
    </div>

    <div className="feature-block">
      <h3>다양한 전략 선택</h3>
      <p>모멘텀 트레이딩, 평균 회귀 전략 등 다양한 옵션을 제공합니다.</p>
    </div>

    <div className="feature-block">
      <h3>강력한 보안</h3>
      <p>사용자 API 키 암호화와 2단계 인증으로 안전한 거래 환경을 보장합니다.</p>
    </div>

    <div className="feature-block">
      <h3>손쉬운 사용</h3>
      <p>직관적인 인터페이스로 누구나 쉽게 자동화 거래를 시작할 수 있습니다.</p>
    </div>

   
  </div>
</section>
  );
};

export default KeyFeatures;