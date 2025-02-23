# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# import vectorbt as vbt  # ✅ Use vectorbt instead of backtesting
# import pandas as pd
# import matplotlib
# import matplotlib.pyplot as plt
# import io
# import base64
# import numpy as np
# import requests 
# import time

# # ✅ Prevent Matplotlib from opening a new window
# matplotlib.use("Agg")  

# def fetch_upbit_candlestick_data(market="KRW-BTC", unit=15, total_count=1000):
#     """
#     Fetch up to `total_count` historical candlesticks from Upbit API.
#     """
#     url = f"https://api.upbit.com/v1/candles/minutes/{unit}"
#     all_data = []
#     to = None

#     while len(all_data) < total_count:
#         count = min(200, total_count - len(all_data))
#         params = {"market": market, "count": count}
#         if to:
#             params["to"] = to  

#         response = requests.get(url, params=params)
#         if response.status_code == 200:
#             data = response.json()
#             if not data:
#                 break  
#             all_data.extend(data)
#             to = data[-1]["candle_date_time_utc"]
#             time.sleep(0.1)  
#         else:
#             print("⚠️ Error fetching Upbit data:", response.json())
#             break

#     df = pd.DataFrame({
#         "Open": [item["opening_price"] for item in all_data],
#         "High": [item["high_price"] for item in all_data],
#         "Low": [item["low_price"] for item in all_data],
#         "Close": [item["trade_price"] for item in all_data],
#         "Volume": [item["candle_acc_trade_volume"] for item in all_data]
#     }, index=pd.to_datetime([item["candle_date_time_kst"] for item in all_data]))

#     df = df.sort_index()  
#     return df


# # ✅ Define Strategies Using vectorbt
# def bollinger_band_strategy(data):
#     """ Bollinger Bands Strategy """
#     bb = vbt.BBANDS.run(data["Close"], window=20, std=2)
#     entries = data["Close"] < bb.lower
#     exits = data["Close"] > bb.upper
#     return entries, exits

# def rsi_strategy(data):
#     """ RSI-Based Strategy """
#     rsi = vbt.RSI.run(data["Close"], window=14)
#     entries = rsi.rsi < 30  # Buy when RSI < 30
#     exits = rsi.rsi > 70  # Sell when RSI > 70
#     return entries, exits

# def macd_strategy(data):
#     """ MACD Crossover Strategy using vectorbt """
#     macd = vbt.MACD.run(data["Close"])
    
#     # ✅ Correct way to detect crossovers
#     entries = macd.macd_crossed_above(macd.signal)  # Buy signal when MACD crosses above signal line
#     exits = macd.macd_crossed_below(macd.signal)    # Sell signal when MACD crosses below signal line
    
#     return entries, exits

# def stochastic_oscillator_strategy(data):
#     """ Stochastic Oscillator Strategy """
#     stoch = vbt.STOCH.run(data["High"], data["Low"], data["Close"])
#     entries = stoch.k < 20  # Buy when %K < 20
#     exits = stoch.k > 80  # Sell when %K > 80
#     return entries, exits


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def run_backtest(request):
#     """ Backtest API using vectorbt """

#     data = fetch_upbit_candlestick_data(market="KRW-BTC", unit=15, total_count=1000)
#     if data.empty:
#         return Response({"error": "Failed to retrieve Upbit data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # ✅ Strategy Map
#     strategy_map = {
#         "볼린저 밴드 전략": bollinger_band_strategy,
#         "RSI 전략": rsi_strategy,
#         "MACD 전략": macd_strategy,
#         "스토캐스틱 오실레이터 전략": stochastic_oscillator_strategy,
#     }

#     strategy_name = request.data.get("strategy")
#     print(f"Received strategy: {strategy_name}")

#     if strategy_name not in strategy_map:
#         return Response({"error": f"Invalid strategy '{strategy_name}'"}, status=status.HTTP_400_BAD_REQUEST)

#     # ✅ Run Strategy
#     entries, exits = strategy_map[strategy_name](data)

#     # ✅ Correct way to execute a backtest in vectorbt
#     portfolio = vbt.Portfolio.from_signals(
#         close=data["Close"],
#     entries=entries,
#     exits=exits,
#     fees=0.002,  # 0.2% trading fee
#     init_cash=10000,  # ✅ Set initial cash balance instead of size
#     sl_stop=0.05,  # Stop loss at -5%
#     tp_stop=0.1,  # Take profit at +
#     )

#     # ✅ Get Statistics
#     stats = portfolio.stats()
#     def sanitize_value(value):
#             if isinstance(value, (int, float, np.number)):  # ✅ Ensure numeric values
#                 if pd.isna(value) or np.isinf(value):  
#                     return None
#                 return value
#             return str(value)  # ✅ Convert non-numeric values to strings

#     clean_stats = {k: sanitize_value(v) for k, v in stats.items()}

#     # ✅ Extract equity curve
#     equity_curve = portfolio.value()
#     equity_df = pd.DataFrame({"Date": equity_curve.index.astype(str), "Equity": equity_curve.values})

#     # ✅ Plot the Backtest
#     plt.ioff()
#     plt.figure(figsize=(12, 6))
#     portfolio.plot()
#     img_buffer = io.BytesIO()
#     plt.savefig(img_buffer, format="png", bbox_inches="tight")
#     img_buffer.seek(0)
#     plt.close()

#     # ✅ Convert image to Base64
#     img_base64 = base64.b64encode(img_buffer.read()).decode("utf-8")
#     portfolio.plot().show()
#     fig = portfolio.plot()
#     html_str = fig.to_html(full_html=False)
#     # ✅ Prepare response
#     return Response({
#         "stats": clean_stats,
#         "equity_curve": equity_df.to_dict(orient="records"),
#         "plot": f"data:image/png;base64,{img_base64}",
#         "plot_html": html_str,
#     }, status=status.HTTP_200_OK)





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
# 업비트에서 캔들 차트 받아오기
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

# 기존 대문자 코드
    # df = pd.DataFrame({
    #     "Open": [item["opening_price"] for item in all_data],
    #     "High": [item["high_price"] for item in all_data],
    #     "Low": [item["low_price"] for item in all_data],
    #     "Close": [item["trade_price"] for item in all_data],
    #     "Volume": [item["candle_acc_trade_volume"] for item in all_data]
    # }, index=pd.to_datetime([item["candle_date_time_kst"] for item in all_data]))


    df = pd.DataFrame({
        "open": [item["opening_price"] for item in all_data],
        "high": [item["high_price"] for item in all_data],
        "low": [item["low_price"] for item in all_data],
        "close": [item["trade_price"] for item in all_data],
        "volume": [item["candle_acc_trade_volume"] for item in all_data]
    }, index=pd.to_datetime([item["candle_date_time_kst"] for item in all_data]))



    df = df.sort_index()  
    return df




# ✅ 각자 전략을 구현할 부분
def bollinger_band_strategy(data):
    """ Bollinger Bands Strategy """
    bb = vbt.BBANDS.run(data["close"], window=20, std=2)
    entries = data["close"] < bb.lower
    exits = data["close"] > bb.upper
    return entries, exits

def rsi_strategy(data):
    """ RSI-Based Strategy """
    rsi = vbt.RSI.run(data["close"], window=14)
    entries = rsi.rsi < 30  # Buy when RSI < 30
    exits = rsi.rsi > 70  # Sell when RSI > 70
    return entries, exits

def macd_strategy(data):
    """ MACD Crossover Strategy using vectorbt """
    macd = vbt.MACD.run(data["close"])
    # ✅ Correct way to detect crossovers
    entries = macd.macd_crossed_above(macd.signal)  # Buy signal when MACD crosses above signal line
    exits = macd.macd_crossed_below(macd.signal)    # Sell signal when MACD crosses below signal line
    return entries, exits

def stochastic_oscillator_strategy(data):
    """ Stochastic Oscillator Strategy """
    stoch = vbt.STOCH.run(data["High"], data["Low"], data["close"])
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
    }       # 전략 추가할것.


    strategy_name = request.data.get("strategy")
    print(f"Received strategy: {strategy_name}")

    if strategy_name not in strategy_map:
        return Response({"error": f"Invalid strategy '{strategy_name}'"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Run Strategy
    entries, exits = strategy_map[strategy_name](data)





    # ✅ Correct way to execute a backtest in vectorbt
    # 백테스팅 실행
    # 추후 이 변수를 직접 브라우저에서 받아오는 구조로 수정할 것
    portfolio = vbt.Portfolio.from_signals(
    close=data["close"],
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

    # ✅ 추가 데이터 생성
    drawdown = portfolio.drawdown()  # 최대 손실 구간 데이터
    drawdown_data = pd.DataFrame({"Date": drawdown.index.astype(str), "Value": drawdown.values})

    trade_returns = portfolio.trades.pnl  # 개별 거래 수익 데이터
    trade_profit_data = trade_returns.values.tolist()  # JSON 변환을 위해 리스트 형태로 저장

    cumulative_returns = portfolio.returns().cumsum()  # 누적 수익률 계산
    cumulative_returns_data = pd.DataFrame({"Date": cumulative_returns.index.astype(str), "Value": cumulative_returns.values})


    # ✅ Plot the Backtest
    plt.ioff()
    plt.figure(figsize=(12, 6))

    # 포트폴리오 결과 그래프 생성
    portfolio.plot()

    # ✅ 이미지를 메모리 버퍼로 저장
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format="png", bbox_inches="tight")
    img_buffer.seek(0)
    plt.close()

    fig = portfolio.plot()
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format="png", bbox_inches="tight")
    img_buffer.seek(0)
    plt.close()

    # ✅ Convert image to Base64
    img_base64 = base64.b64encode(img_buffer.read()).decode("utf-8")
    portfolio.plot().show()
    # fig = portfolio.plot()
    # html_str = fig.to_html(full_html=False)

    # # ✅ 포트폴리오 그래프 생성 (Plotly)
    # plot_html = portfolio.plot().to_html(full_html=False)

    # # ✅ Orders 데이터 (매매 정보)
    # orders = portfolio.orders.records_readable

    # # ✅ Trade PnL 데이터 (거래별 수익/손실)
    # trade_pnl = portfolio.trades.records_readable[['entry_price', 'exit_price', 'pnl']]
    # print("📊 Trade PnL 데이터 확인:")
    # print(portfolio.trades.records_readable.head())  # ✅ 실제 컬럼 구조 확인


    # # ✅ Cumulative Returns 데이터 (누적 수익률)
    # cumulative_returns = portfolio.value() / portfolio.value().iloc[0]  # 기준 대비 변화율

    # # ✅ Trade PnL 데이터 확인
    # trade_pnl_df = portfolio.trades.records_readable

    # if trade_pnl_df is None or trade_pnl_df.empty:
    #     print("⚠️ Trade PnL 데이터가 없습니다.")
    #     trade_pnl = []
    # else:
    #     available_columns = trade_pnl_df.columns.tolist()
    #     print("✅ Trade PnL 컬럼 목록:", available_columns)

    #     # ✅ 대체할 컬럼 매핑 (이름이 다를 경우 대비)
    #     column_mapping = {
    #         "entry_price": ["entry_price", "open_price", "buy_price"],
    #         "exit_price": ["exit_price", "close_price", "sell_price"],
    #         "pnl": ["pnl", "profit_loss", "return"]
    #     }

    #     # ✅ 실제 존재하는 컬럼 찾기
    #     selected_columns = {}
    #     for key, possible_names in column_mapping.items():
    #         for name in possible_names: 
    #             if name in available_columns:
    #                 selected_columns[key] = name
    #                 break

    #     if len(selected_columns) == 3:  # 모든 컬럼이 존재하는 경우
    #         trade_pnl = trade_pnl_df[[selected_columns["entry_price"], selected_columns["exit_price"], selected_columns["pnl"]]].to_dict(orient="records")
    #     else:
    #         print("⚠️ 예상한 컬럼이 없습니다. 기존 컬럼 사용 가능:", available_columns)
    #         trade_pnl = trade_pnl_df.to_dict(orient="records")  # 전체 컬럼 반환



    # # ✅ Prepare response
    # return Response({
    #     "stats": clean_stats,
    #     "equity_curve": equity_df.to_dict(orient="records"),
    #     "plot": f"data:image/png;base64,{img_base64}",
    #     "plot_html": html_str,
    # }, status=status.HTTP_200_OK)

    # ✅ JSON 응답에 새로운 데이터 추가
    return Response({
        "stats": stats.to_dict(),
        "equity_curve": portfolio.value().to_frame("Equity").reset_index().rename(columns={"index": "Date"}).to_dict(orient="records"),
        "drawdown_data": drawdown_data.to_dict(orient="records"),  # ✅ 추가됨
        "trade_profit_data": trade_profit_data,  # ✅ 추가됨
        "cumulative_returns": cumulative_returns_data.to_dict(orient="records"),  # ✅ 추가됨
        # "plot": f"data:image/png;base64,{img_base64}"  # ✅ 접두사 추가
        "plot": f"data:image/png;base64,{base64.b64encode(io.BytesIO().read()).decode('utf-8')}",
        "plot_html": portfolio.plot().to_html(full_html=False),
    }, status=status.HTTP_200_OK) 

    # # ✅ JSON 응답 반환
    # return Response({
    #     "stats": stats,  # ✅ 이미 딕셔너리 형태일 경우 변환 불필요
    #     "equity_curve": portfolio.value().to_frame("Equity").reset_index().rename(columns={"index": "Date"}).to_dict(orient="records"),
    #     "drawdown_data": drawdown_data.to_dict(orient="records"),  # ✅ 추가됨
    #     "trade_profit_data": trade_profit_data,  # ✅ 추가됨
    #     "cumulative_returns": cumulative_returns_data.to_dict(orient="records"),  # ✅ 추가됨
    #     "plot": f"data:image/png;base64,{img_base64}",  # ✅ Base64 변환 정상 작동
    #     "plot_html": plot_html  # ✅ Plotly HTML 추가 (지원 가능할 때만)
    # }, status=status.HTTP_200_OK)
