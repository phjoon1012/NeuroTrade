import pandas as pd
import ta
from backtesting import Strategy

class MACD_Crossover(Strategy):
    print("MACD ACCESSED")
    def init(self):
        # MACD Indicator
        self.macd = self.I(lambda x: ta.trend.MACD(pd.Series(x)).macd(), self.data.Close)
        self.signal = self.I(lambda x: ta.trend.MACD(pd.Series(x)).macd_signal(), self.data.Close)

    def next(self):
        if not self.position:  # No open position
            if self.macd[-2] > self.signal[-2]:  
                self.buy(size=0.02)  # Buy when MACD crosses above Signal
            elif self.macd[-2] < self.signal[-2]:  
                self.sell(size=0.02)  # Sell when MACD crosses below Signal