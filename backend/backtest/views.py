from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from backtesting import Backtest, Strategy
import pandas as pd
import ta

@api_view(['POST'])
@permission_classes([AllowAny])
def run_backtest(request):
    # Simulated Data
    dates = pd.date_range(start='2023-01-01', periods=20, freq='D')
    data = pd.DataFrame({
        'Open': [100 + i for i in range(20)],
        'High': [105 + i for i in range(20)],
        'Low': [95 + i for i in range(20)],
        'Close': [102 + i for i in range(20)],
        'Volume': [1000 + i*10 for i in range(20)]
    }, index=dates)

    

    # Extract parameters from the request
    ema_period = request.data.get('ema_period', 200)
    rsi_period = request.data.get('rsi_period', 30)
    tp = request.data.get('tp', 0.02)  # Take Profit
    sl = request.data.get('sl', 0.01)  # Stop Loss
    
    print(f"Received parameters: EMA: {ema_period}, RSI: {rsi_period}, TP: {tp}, SL: {sl}")

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
        # Run the backtest
        bt = Backtest(data, CustomStrategy, cash=10000, commission=.002)
        print("Backtest initialized. Running backtest now...")
        stats = bt.run()

        # Sanitize stats for JSON serialization
        def sanitize_stats(stats):
            sanitized = {}
            for key, value in stats.items():
                if key.startswith('_'):  # Skip internal non-serializable fields
                    continue
                if isinstance(value, (float, int)):
                    sanitized[key] = None if pd.isna(value) else value
                else:
                    sanitized[key] = str(value)
            return sanitized

        clean_stats = sanitize_stats(stats)

        # Extract equity curve for plotting
        equity_curve = stats['_equity_curve'].reset_index()
        equity_curve['Date'] = equity_curve['index'].astype(str)  # Convert datetime to string for JSON

        # Prepare response
        return Response({
            "stats": clean_stats,
            "equity_curve": equity_curve[['Date', 'Equity']].to_dict(orient='records')  # Only send date and equity
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)