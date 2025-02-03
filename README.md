<div align="center">
  
# **NeuroTrade**
### _AI 기반 암호화폐 자동매매 서비스_  

<p align="center">
  <br /><br />
  <img 
    src="frontend/public/FullLogo.png"
    alt="Centered Image"
    width="700" 
    style="margin-bottom:100px;"
  />
  <br /><br />
</p>

</div>

---

## SK Networks AI 10기

- **팀**:   

| <img width="140" alt="profile" src="https://github.com/user-attachments/assets/8e06d681-5960-475a-9d4f-a583c6f73452" /> | <img width="140px" src="https://github.com/Jenny-Jo/Private/blob/main/KakaoTalk_Photo_2025-01-19-20-09-54.jpeg" /> | <img width="140px" src="https://avatars.githubusercontent.com/u/192850593?s=400&u=be089a694707b0a8ab3272f7d43915ffa31f2ead&v=4" /> |  <img width="140px" src="https://github.com/user-attachments/assets/7f84aa3d-dd5e-4e3a-a6c0-56cff42069ca" /> | <img width="140px" src="https://github.com/user-attachments/assets/4619235e-7708-4242-8495-9c432aad7b52" /> | <img width="140px" alt="profile" src="https://avatars.githubusercontent.com/u/108564469?u=f6f74dc7dde9299cc428a3f514de1bf1302b3af7&v=4" /> | <img width="140px" src="https://github.com/user-attachments/assets/93e806d4-2c3a-4ef1-a851-c777b8b8a21a" /> |
|:----------:|:----------:|:----------:|:----------:|:----------:|:----------:|:----------:|
| 박현준 | 조현정 | 조영훈 | 원유형 | 전서빈 | 편성민 | 정소열 |
|[@phjoon1012](https://github.com/phjoon1012)|[@조현정](https://github.com/Jenny-Jo)|[@조영훈](https://github.com/yhcho0319)|[@uhyeong](https://github.com/uhyeong)| [@wjstjqls](https://github.com/wjstjqls)|[@PyeonMin](https://github.com/PyeonMin)| [@정소열]()| 
| 팀장 | 팀원 | 팀원 | 팀원 | 팀원 | 팀원 | 팀원 |

<p align="center">
  <br /><br />
    <img width="500" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/3128d4e9-ac4b-430f-aae1-612c891bc507"/>
  <br /><br />
</p>


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

- **암호화폐 자동 매수/매도**  
  AWS 기반 암호화폐 자동 매매 봇.

- **AI 기반 의사결정**  
  고급 머신러닝 알고리즘을 이용한 최적 매매 전략 구현.

- **백테스팅 및 시각화**  
  - 백테스트를 통해 전략의 성과 분석.  
  - 거래 내역 및 자산 변동 그래프 제공.  
  - **실시간 BTC 가격 차트** 및 **전략 비교 그래프** 제공.

<br />



## 기술 스택

 - **Python**: for backend & AI/ML scripts  
 - **AWS**: for hosting, scheduled tasks, data storage  
 - **Docker**: for containerization (if applicable)  
 - **Pandas / NumPy**: data manipulation  
 - **PyTorch**: machine learning models

- **Streamlit**  
  웹 기반 사용자 인터페이스 제공.

- **Plotly**  
  데이터 시각화 (거래 내역, 자산 커브 등).

- **Binance Futures API**  
  실시간 암호화폐 데이터 및 거래 기능.

- **Docker**  
  컨테이너화 및 배포 (옵션).

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

  #### LSTM 기법을 이용한 비트코인 가격 예측 모델

  <p align="center">
  <br /><br />
    <img width="900" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/5aaeaf52-241f-49db-8f73-346758934352"/>
  <br /><br />
</p>

  ##### 학습 데이터: Binance Market Data BTCUSDT 12월 1시간 봉
  
  ---

  <br /><br />

  #### Gradient Boosting 기법을 이용한 비트코인 가격 예측 모델

  <p align="center">
  <br /><br />
    <img width="900" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/42c01d4d-b4b8-416e-9b0a-e9d3e8a1e598"/>
  <br /><br />
</p>

  ##### 학습 데이터: Binance Market Data BTCUSDT 12월 1시간 봉
  
  ---

  <br /><br />

  #### Gradient Boosting + LSTM (5:5)

  <p align="center">
  <br /><br />
    <img width="900" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/e4434ad5-adb6-49c4-8414-92736437b410"/>
  <br /><br />
</p>

  ##### 학습 데이터: Binance Market Data BTCUSDT 12월 1시간 봉
  
  ---

  <br /><br />
  
  #### 거래일에 따른 수익률 표시기

  <p align="center">
  <br /><br />
    <img width="900" alt="Screenshot 2025-01-10 at 7 33 27 PM" src="https://github.com/user-attachments/assets/877c958c-e071-49f4-94d3-0a8c5ac4a195"/>
  <br /><br />
</p>

  ##### 학습 데이터: Binance Market Data BTCUSDT 12월 1시간 봉
  
  ---

  <br /><br />
</div>





## **설치 및 실행**

```plaintext
├── app.py                # Streamlit 메인 애플리케이션
├── helper.py             # 데이터 수집 및 유틸리티 함수
├── strategies.py         # 거래 전략 클래스 정의
├── visualization.py      # 시각화 함수 (그래프 생성)
├── liveBTC.py            # 실시간 BTC 가격 차트
├── requirements.txt      # Python 패키지 종속성
├── .env                  # 환경 변수 (API 키/시크릿)
└── README.md             # 프로젝트 설명서
```
### **1. 환경 설정**

```bash
Python 3.9+ 버전을 사용하는 것이 권장됩니다.

# 필수 패키지 설치
pip install -r requirements.txt

streamlit run app.py
```


## **사용 방법**

1. **전략 선택**:  
   RSI, MACD, Bollinger Bands, 통합 전략 중 하나를 선택.

2. **백테스트 변수 입력**:  
   - 거래 화폐 (BTCUSDT, ETHUSDT 등).  
   - 시간 단위 (1m, 5m, 15m 등).  
   - 이익 실현/손실 제한 비율.  
   - 초기 자본 및 마진.  

3. **결과 분석**:  
   - 승률, PnL, 거래 횟수, 자산 커브, 실시간 BTC 가격 확인.  
   - **전략 비교**: Buy & Hold 대비 성과 확인.
