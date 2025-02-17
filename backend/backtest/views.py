from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import vectorbt as vbt  # ✅ Use vectorbt instead of backtesting
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
import numpy as np
import requests
import time

# ✅ Prevent Matplotlib from opening a new window
matplotlib.use("Agg")  

def fetch_upbit_candlestick_data(market="KRW-BTC", unit=15, total_count=1000):
    """
    Fetch up to `total_count` historical candlesticks from Upbit API.
    """
    url = f"https://api.upbit.com/v1/candles/minutes/{unit}"
    all_data = []
    to = None

    while len(all_data) < total_count:
        count = min(200, total_count - len(all_data))
        params = {"market": market, "count": count}
        if to:
            params["to"] = to  

        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            if not data:
                break  
            all_data.extend(data)
            to = data[-1]["candle_date_time_utc"]
            time.sleep(0.1)  
        else:
            print("⚠️ Error fetching Upbit data:", response.json())
            break

    df = pd.DataFrame({
        "Open": [item["opening_price"] for item in all_data],
        "High": [item["high_price"] for item in all_data],
        "Low": [item["low_price"] for item in all_data],
        "Close": [item["trade_price"] for item in all_data],
        "Volume": [item["candle_acc_trade_volume"] for item in all_data]
    }, index=pd.to_datetime([item["candle_date_time_kst"] for item in all_data]))

    df = df.sort_index()  
    return df


# ✅ Define Strategies Using vectorbt
def bollinger_band_strategy(data):
    """ Bollinger Bands Strategy """
    bb = vbt.BBANDS.run(data["Close"], window=20, std=2)
    entries = data["Close"] < bb.lower
    exits = data["Close"] > bb.upper
    return entries, exits

def rsi_strategy(data):
    """ RSI-Based Strategy """
    rsi = vbt.RSI.run(data["Close"], window=14)
    entries = rsi.rsi < 30  # Buy when RSI < 30
    exits = rsi.rsi > 70  # Sell when RSI > 70
    return entries, exits

def macd_strategy(data):
    """ MACD Crossover Strategy using vectorbt """
    macd = vbt.MACD.run(data["Close"])
    
    # ✅ Correct way to detect crossovers
    entries = macd.macd_crossed_above(macd.signal)  # Buy signal when MACD crosses above signal line
    exits = macd.macd_crossed_below(macd.signal)    # Sell signal when MACD crosses below signal line
    
    return entries, exits

def stochastic_oscillator_strategy(data):
    """ Stochastic Oscillator Strategy """
    stoch = vbt.STOCH.run(data["High"], data["Low"], data["Close"])
    entries = stoch.k < 20  # Buy when %K < 20
    exits = stoch.k > 80  # Sell when %K > 80
    return entries, exits


@api_view(['POST'])
@permission_classes([AllowAny])
def run_backtest(request):
    """ Backtest API using vectorbt """

    data = fetch_upbit_candlestick_data(market="KRW-BTC", unit=15, total_count=1000)
    if data.empty:
        return Response({"error": "Failed to retrieve Upbit data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # ✅ Strategy Map
    strategy_map = {
        "볼린저 밴드 전략": bollinger_band_strategy,
        "RSI 전략": rsi_strategy,
        "MACD 전략": macd_strategy,
        "스토캐스틱 오실레이터 전략": stochastic_oscillator_strategy,
    }

    strategy_name = request.data.get("strategy")
    print(f"Received strategy: {strategy_name}")

    if strategy_name not in strategy_map:
        return Response({"error": f"Invalid strategy '{strategy_name}'"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Run Strategy
    entries, exits = strategy_map[strategy_name](data)

    # ✅ Correct way to execute a backtest in vectorbt
    portfolio = vbt.Portfolio.from_signals(
        close=data["Close"],
    entries=entries,
    exits=exits,
    fees=0.002,  # 0.2% trading fee
    init_cash=10000,  # ✅ Set initial cash balance instead of size
    sl_stop=0.05,  # Stop loss at -5%
    tp_stop=0.1,  # Take profit at +
    )

    # ✅ Get Statistics
    stats = portfolio.stats()
    def sanitize_value(value):
            if isinstance(value, (int, float, np.number)):  # ✅ Ensure numeric values
                if pd.isna(value) or np.isinf(value):  
                    return None
                return value
            return str(value)  # ✅ Convert non-numeric values to strings

    clean_stats = {k: sanitize_value(v) for k, v in stats.items()}

    # ✅ Extract equity curve
    equity_curve = portfolio.value()
    equity_df = pd.DataFrame({"Date": equity_curve.index.astype(str), "Equity": equity_curve.values})

    # ✅ Plot the Backtest
    plt.ioff()
    plt.figure(figsize=(12, 6))
    portfolio.plot()
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format="png", bbox_inches="tight")
    img_buffer.seek(0)
    plt.close()

    # ✅ Convert image to Base64
    img_base64 = base64.b64encode(img_buffer.read()).decode("utf-8")
    portfolio.plot().show()
    fig = portfolio.plot()
    html_str = fig.to_html(full_html=False)
    # ✅ Prepare response
    return Response({
        "stats": clean_stats,
        "equity_curve": equity_df.to_dict(orient="records"),
        "plot": f"data:image/png;base64,{img_base64}",
        "plot_html": html_str,
    }, status=status.HTTP_200_OK)