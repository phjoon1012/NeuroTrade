import wx
from dashboard import DashboardPanel
from trade import TradePanel
from backtest import BacktestPanel
from login import LoginPanel

class MyFrame(wx.Frame):
    def __init__(self):
        super().__init__(parent=None, title="Crypto Trading", size=(700, 500))
        
        self.panel = wx.Panel(self)
        self.sizer = wx.BoxSizer(wx.VERTICAL)

        self.menu_panel = wx.Panel(self.panel, size=(-1, 50))
        self.menu_panel.SetBackgroundColour(wx.Colour(60, 60, 60))
        self.menu_sizer = wx.BoxSizer(wx.HORIZONTAL)

        self.dashboard_btn = wx.Button(self.menu_panel, label="대시보드")
        self.trade_btn = wx.Button(self.menu_panel, label="거래/전략")
        self.backtest_btn = wx.Button(self.menu_panel, label="백테스팅")

        self.menu_sizer.Add(self.dashboard_btn, flag=wx.ALL, border=5)
        self.menu_sizer.Add(self.trade_btn, flag=wx.ALL, border=5)
        self.menu_sizer.Add(self.backtest_btn, flag=wx.ALL, border=5)
        self.menu_panel.SetSizer(self.menu_sizer)

        self.login_panel = LoginPanel(self.panel, self.on_login)

        self.dashboard_panel = DashboardPanel(self.panel)
        self.trade_panel = TradePanel(self.panel)
        self.backtest_panel = BacktestPanel(self.panel)

        self.sizer.Add(self.login_panel, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        self.sizer.Add(self.menu_panel, flag=wx.EXPAND | wx.TOP, border=0)
        self.sizer.Add(self.dashboard_panel, flag=wx.EXPAND | wx.ALL, border=10, proportion=1)
        self.sizer.Add(self.trade_panel, flag=wx.EXPAND | wx.ALL, border=10, proportion=1)
        self.sizer.Add(self.backtest_panel, flag=wx.EXPAND | wx.ALL, border=10, proportion=1)

        self.menu_panel.Hide()
        self.dashboard_panel.Hide()
        self.trade_panel.Hide()
        self.backtest_panel.Hide()

        self.dashboard_btn.Bind(wx.EVT_BUTTON, self.show_dashboard)
        self.trade_btn.Bind(wx.EVT_BUTTON, self.show_trade)
        self.backtest_btn.Bind(wx.EVT_BUTTON, self.show_backtest)

        self.panel.SetSizer(self.sizer)
        self.Center()
        self.Show()

    def on_login(self):
        self.login_panel.Hide()
        self.menu_panel.Show()
        self.show_dashboard(None)

    def show_dashboard(self, event):
        self.dashboard_panel.Show()
        self.trade_panel.Hide()
        self.backtest_panel.Hide()
        self.panel.Layout()

    def show_trade(self, event):
        self.trade_panel.Show()
        self.dashboard_panel.Hide()
        self.backtest_panel.Hide()
        self.panel.Layout()

    def show_backtest(self, event):
        self.backtest_panel.Show()
        self.dashboard_panel.Hide()
        self.trade_panel.Hide()
        self.panel.Layout()
