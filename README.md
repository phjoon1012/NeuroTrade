<div align="center">

# **Cryptocurrency - AlgoTrading**  
### _기계학습을 이용한 암호화폐의 자동매매_  

<p align="center">
  <br /><br />
  <img 
    src="https://github.com/user-attachments/assets/b6565023-e63e-4d49-9f87-7ac1fe364f3c"
    alt="Centered Image"
    width="700" 
    style="margin-bottom:100px;"
  />
  <br /><br />
</p>

</div>

---

## SK Networks AI 10기

- **팀장**: 박현준  
- **팀원**: 조현정, 정소열, 조영훈, 원유형, 전서빈, 편성민

<br />

## 목차

1. 개요
2. 기능
3. 기술 스택
4. 설치
5. 이용
6. 프로젝트 구조
8. 라이센스

---

## 개요

***본 프로젝트는 머신러닝 기반의 암호화폐 자동 매매 시스템을 구축하기 위한 연구·개발 과제입니다. 다양한 암호화폐 시장 데이터를 수집·분석하여, 이를 토대로 자동 매수/매도 로직을 수행함으로써 효율적이고 안정적인 투자 전략을 구현하려고 합니다. 특히 AWS 등 클라우드 인프라를 활용하여 실시간 데이터 수집 및 모델 추론을 가능하게 하며, 빅데이터와 AI 기법을 결합해 시장 변동성에 대응할 수 있는 솔루션을 제시하고자 합니다.***
 - 실시간 데이터 수집을 통해 빠른 의사결정 가능
 - 머신러닝/딥러닝 모델을 이용한 예측 및 자동화된 트레이딩 시스템 구현
 - 백테스트 및 모의투자 등을 통한 전략 검증 및 고도화

<br />

## 기능

- **암호화폐 자동 매수/매도**: AWS based cryptocurrency trading bot.
- **AI 기반 의사결정**: Utilizes advanced machine learning algorithms to optimize trading strategies.
- **빅데이터 활용**: Designed to handle large-scale market data in real time.

> **TODO**: 
>  - 현재 승률
>  - PnL 
>  - 거래 내역

<br />



## 기술 스택

 - **Python**: for backend & AI/ML scripts  
 - **AWS**: for hosting, scheduled tasks, data storage  
 - **Docker**: for containerization (if applicable)  
 - **Pandas / NumPy**: data manipulation  
 - **PyTorch**: machine learning models  

<br />

### 예시 코드




```python
import torch
import torch.nn as nn

class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])  # Use the last output of the LSTM
        return out
```
<br /><br />
  
<div align="center">
LSTM 기법을 이용한 비트코인 가격 예측 모델
</div>

<p align="center">
  <br /><br />
    <img width="700" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/5aaeaf52-241f-49db-8f73-346758934352"/>
  <br /><br />
</p>
<div align="center">
학습 데이터: Binance Market Data BTCUSDT 12월 1시간 봉
</div>

<br /><br /><br /><br />

<div align="center">
Gradient Boosting 기법을 이용한 비트코인 가격 예측 모델
</div>
<p align="center">
  <br /><br />
    <img width="700" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/42c01d4d-b4b8-416e-9b0a-e9d3e8a1e598"/>
  <br /><br />
</p>
<div align="center">
학습 데이터: Binance Market Data BTCUSDT 12월 1시간 봉
</div>

<div align="center">
Gradient Boosting + LSTM
</div>
<p align="center">
  <br /><br />
    <img width="700" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/42c01d4d-b4b8-416e-9b0a-e9d3e8a1e598"/>
  <br /><br />
</p>
<div align="center">
학습 데이터: Binance Market Data BTCUSDT 12월 1시간 봉
</div>

## 설치

> **TODO**:

