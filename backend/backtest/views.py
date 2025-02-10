from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from backtesting import Backtest, Strategy
import pandas as pd
import ta
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
import numpy as np  # ✅ Fix: Handle NaN/Inf values
import requests


# ✅ Prevent Matplotlib from opening a new window
matplotlib.use("Agg")  
import requests
import pandas as pd
import time

def fetch_upbit_candlestick_data(market="KRW-BTC", unit=15, total_count=1000):
    """
    Fetch up to `total_count` historical candlesticks from Upbit API.
    Since Upbit allows only 200 candles per request, this function makes multiple requests.

    :param market: Market symbol (default: KRW-BTC)
    :param unit: Timeframe in minutes (default: 15)
    :param total_count: Total number of candles to fetch (default: 1000)
    :return: Pandas DataFrame containing OHLCV data
    """
    url = f"https://api.upbit.com/v1/candles/minutes/{unit}"
    all_data = []
    to = None  # Used to get older data

    while len(all_data) < total_count:
        count = min(200, total_count - len(all_data))  # Fetch only the remaining needed candles
        params = {"market": market, "count": count}
        if to:
            params["to"] = to  # Request older data

        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            if not data:
                break  # Stop if no more data is available

            all_data.extend(data)

            # ✅ Set `to` as the oldest candle timestamp to fetch the next batch
            to = data[-1]["candle_date_time_utc"]
            time.sleep(0.1)  # Prevent hitting API rate limits
        else:
            print("⚠️ Error fetching Upbit data:", response.json())
            break

    # ✅ Convert to DataFrame
    df = pd.DataFrame({
        "Open": [item["opening_price"] for item in all_data],
        "High": [item["high_price"] for item in all_data],
        "Low": [item["low_price"] for item in all_data],
        "Close": [item["trade_price"] for item in all_data],
        "Volume": [item["candle_acc_trade_volume"] for item in all_data]
    }, index=pd.to_datetime([item["candle_date_time_kst"] for item in all_data]))

    df = df.sort_index()  # ✅ Ensure chronological order
    return df

@api_view(['POST'])
@permission_classes([AllowAny])
def run_backtest(request):
    # Simulated Data
    # dates = pd.date_range(start='2023-01-01', periods=20, freq='D')
    # data = pd.DataFrame({
    #     'Open': [100 + i for i in range(20)],
    #     'High': [105 + i for i in range(20)],
    #     'Low': [95 + i for i in range(20)],
    #     'Close': [102 + i for i in range(20)],
    #     'Volume': [1000 + i * 10 for i in range(20)]
    # }, index=dates)

    data = fetch_upbit_candlestick_data(market="KRW-BTC", unit=15, total_count=1000)

    if data.empty:
        return Response({"error": "Failed to retrieve Upbit data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # Extract parameters from the request
    ema_period = request.data.get('ema_period', 200)
    rsi_period = request.data.get('rsi_period', 30)
    tp = request.data.get('tp', 0.02)  # Take Profit
    sl = request.data.get('sl', 0.01)  # Stop Loss

    # Define the custom strategy
    class CustomStrategy(Strategy):
        def init(self):
            self.rsi = self.I(lambda x: ta.momentum.RSIIndicator(pd.Series(x), rsi_period).rsi(), self.data.Close)
            self.ema = self.I(lambda x: ta.trend.EMAIndicator(pd.Series(x), ema_period).ema_indicator(), self.data.Close)

        def next(self):
            price = self.data.Close[-1]
            if not self.position:
                if self.rsi[-2] < 30:
                    self.buy(size=0.02, tp=price * (1 + tp), sl=price * (1 - sl))
                elif self.rsi[-2] > 70:
                    self.sell(size=0.02, tp=price * (1 - tp), sl=price * (1 + sl))

    try:
        # ✅ Run the backtest
        bt = Backtest(data, CustomStrategy, cash=10000, commission=.002)
        stats = bt.run()

        # ✅ Handle NaN/Inf values
        def sanitize_stats(stats):
            sanitized = {}
            for key, value in stats.items():
                if key.startswith('_'):  # Skip internal non-serializable fields
                    continue
                if isinstance(value, (float, int)):
                    if pd.isna(value) or np.isinf(value):
                        sanitized[key] = None
                    else:
                        sanitized[key] = value
                else:
                    sanitized[key] = str(value)
            return sanitized

        clean_stats = sanitize_stats(stats)

        # ✅ Extract equity curve for plotting
        try:
            equity_curve = stats['_equity_curve'].reset_index()
            equity_curve['Date'] = equity_curve['index'].astype(str)
        except KeyError as e:
            print("Missing key in stats:", e)
            equity_curve = pd.DataFrame()

        # ✅ Prevent Matplotlib from opening a new window
        plt.ioff()  # Turn off interactive mode (prevents pop-ups)
        plt.figure(figsize=(12, 6))
        bt.plot()  # Generate plot

        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format="png", bbox_inches="tight")
        img_buffer.seek(0)
        plt.close()  # Close plot to free memory

        # ✅ Convert image to Base64
        img_base64 = base64.b64encode(img_buffer.read()).decode("utf-8")

        # ✅ Prepare response
        return Response({
            "stats": clean_stats,
            "equity_curve": equity_curve[['Date', 'Equity']].to_dict(orient='records') if not equity_curve.empty else [],
            "plot": f"data:image/png;base64,{img_base64}"
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)