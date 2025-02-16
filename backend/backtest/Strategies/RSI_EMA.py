import pandas as pd
import ta
from backtesting import Strategy
from backtesting.test import SMA, GOOG


# ✅ Define Custom Strategy in `strategies.py`
class rsi_ema(Strategy):
    def init(self):
        self.rsi = self.I(lambda x: ta.momentum.RSIIndicator(pd.Series(x), 30).rsi(), self.data.Close)
        self.ema = self.I(lambda x: ta.trend.EMAIndicator(pd.Series(x), 200).ema_indicator(), self.data.Close)

    def next(self):
        price = self.data.Close[-1]
        if not self.position:
            if self.rsi[-2] < 30:
                self.buy(size=0.02, tp=price * 1.02, sl=price * 0.99)
            elif self.rsi[-2] > 70:
                self.sell(size=0.02, tp=price * 0.98, sl=price * 1.01)


class SmaCross(Strategy):
    n1 = 10
    n2 = 20

    def init(self):
        close = self.data.Close
        self.sma1 = self.I(SMA, close, self.n1)
        self.sma2 = self.I(SMA, close, self.n2)

    def next(self):
        if crossover(self.sma1, self.sma2):
            self.position.close()
            self.buy()
        elif crossover(self.sma2, self.sma1):
            self.position.close()
            self.sell()