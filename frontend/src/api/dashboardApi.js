import axios from 'axios';

// CSRF 토큰 가져오기
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// axios 기본 설정
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Upbit 잔고 조회
export const getUpbitBalance = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8000/dashboard/balance/',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    console.log('Balance response:', response.data);  // 디버깅용
    return response.data;
  } catch (error) {
    console.error('Error fetching Upbit balance:', error.response?.data || error);
    return [];
  }
};

// 거래 내역 조회 (임시 데이터)
export const fetchTradeHistory = async () => {
  try {
    // TODO: 실제 API 연동 시 이 부분을 수정
    return [
      {
        trade_time: new Date(),
        asset: "BTC",
        trade_type: "매수",
        amount: "0.1",
        price: "50000000",
        profit_loss: 100000,
        status: "완료"
      },
      // ... 더 많은 거래 내역
    ];
  } catch (error) {
    console.error('Error fetching trade history:', error);
    return [];
  }
};

// API 키 업데이트
export const updateApiKeys = async (apiKey, secretKey) => {
  const csrftoken = getCookie('csrftoken');
  try {
    const response = await axios.put(
      'http://localhost:8000/dashboard/profile/',
      {
        api_key: apiKey,
        api_secret: secretKey
      },
      {
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || '업데이트 중 오류가 발생했습니다.');
  }
};