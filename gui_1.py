import wx

class DashboardPanel(wx.Panel):
    def __init__(self, parent):
        super().__init__(parent)
        
        vbox = wx.BoxSizer(wx.VERTICAL)
        
        chart_panel = wx.Panel(self, size=(-1, 150))
        chart_panel.SetBackgroundColour(wx.Colour(200, 200, 200))
        
        info_sizer = wx.BoxSizer(wx.HORIZONTAL)
        
        self.info_panel = wx.Panel(self, size=(120, 120))
        self.info_panel.SetBackgroundColour(wx.Colour(180, 180, 180))
        
        self.asset_panel = wx.Panel(self, size=(120, 120))
        self.asset_panel.SetBackgroundColour(wx.Colour(180, 180, 180))
        
        info_sizer.Add(self.info_panel, flag=wx.ALL, border=10)
        info_sizer.Add(self.asset_panel, flag=wx.ALL, border=10)
        
        vbox.Add(chart_panel, flag=wx.EXPAND | wx.ALL, border=10)
        vbox.Add(info_sizer, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        
        self.SetSizer(vbox)

class TradePanel(wx.Panel):
    def __init__(self, parent):
        super().__init__(parent)
        
        vbox = wx.BoxSizer(wx.VERTICAL)
        
        strategy_panel = wx.Panel(self, size=(100, 150))
        strategy_panel.SetBackgroundColour(wx.Colour(180, 180, 180))
        
        trade_section = wx.Panel(self, size=(-1, 100))
        trade_section.SetBackgroundColour(wx.Colour(160, 160, 160))
        
        history_panel = wx.Panel(self, size=(-1, 80))
        history_panel.SetBackgroundColour(wx.Colour(140, 140, 140))
        
        hbox = wx.BoxSizer(wx.HORIZONTAL)
        hbox.Add(strategy_panel, flag=wx.ALL, border=10)
        hbox.Add(trade_section, flag=wx.EXPAND | wx.ALL, border=10, proportion=1)
        
        vbox.Add(hbox, flag=wx.EXPAND | wx.ALL, border=10)
        vbox.Add(history_panel, flag=wx.EXPAND | wx.ALL, border=10)
        
        self.SetSizer(vbox)

class BacktestPanel(wx.Panel):
    def __init__(self, parent):
        super().__init__(parent)
        
        vbox = wx.BoxSizer(wx.VERTICAL)
        
        graph_panel = wx.Panel(self, size=(-1, 150))
        graph_panel.SetBackgroundColour(wx.Colour(160, 160, 160))
        
        strategy_sizer = wx.BoxSizer(wx.HORIZONTAL)
        for i in range(1, 5):
            btn = wx.Button(self, label=f"전략{i}", size=(80, 40))
            strategy_sizer.Add(btn, flag=wx.ALL, border=5)
        
        settings_panel = wx.Panel(self, size=(-1, 100))
        settings_panel.SetBackgroundColour(wx.Colour(140, 140, 140))
        
        vbox.Add(graph_panel, flag=wx.EXPAND | wx.ALL, border=10)
        vbox.Add(strategy_sizer, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        vbox.Add(settings_panel, flag=wx.EXPAND | wx.ALL, border=10)
        
        self.SetSizer(vbox)

class StyledButton(wx.Button):
    def __init__(self, parent, label):
        super().__init__(parent, label=label, size=(100, 40))
        self.SetForegroundColour(wx.WHITE)
        self.SetBackgroundColour(wx.Colour(50, 50, 50))
        self.SetFont(wx.Font(10, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_BOLD))

class MyFrame(wx.Frame):
    def __init__(self):
        super().__init__(parent=None, title="Crypto Trading", size=(700, 500))
        
        self.panel = wx.Panel(self)
        self.panel.SetBackgroundColour(wx.Colour(240, 240, 240))
        self.sizer = wx.BoxSizer(wx.VERTICAL)
        
        self.menu_panel = wx.Panel(self.panel, size=(-1, 50))
        self.menu_panel.SetBackgroundColour(wx.Colour(60, 60, 60))
        self.menu_sizer = wx.BoxSizer(wx.HORIZONTAL)
        
        self.dashboard_btn = StyledButton(self.menu_panel, "대시보드")
        self.trade_btn = StyledButton(self.menu_panel, "거래/전략")
        self.backtest_btn = StyledButton(self.menu_panel, "백테스팅")
        
        self.menu_sizer.Add(self.dashboard_btn, flag=wx.ALL, border=5)
        self.menu_sizer.Add(self.trade_btn, flag=wx.ALL, border=5)
        self.menu_sizer.Add(self.backtest_btn, flag=wx.ALL, border=5)
        self.menu_panel.SetSizer(self.menu_sizer)
        
        self.login_panel = wx.Panel(self.panel)
        self.login_panel_sizer = wx.BoxSizer(wx.VERTICAL)
        
        logo = wx.StaticText(self.login_panel, label="로고", style=wx.ALIGN_CENTER)
        logo.SetBackgroundColour(wx.Colour(180, 180, 180))
        logo.SetMinSize((100, 100))
        
        self.api_key_input = wx.TextCtrl(self.login_panel, style=wx.TE_PASSWORD, size=(200, -1))
        self.upbit_link = StyledButton(self.login_panel, "업비트 링크")
        self.login_button = StyledButton(self.login_panel, "로그인")
        
        self.login_button.Bind(wx.EVT_BUTTON, self.on_login)
        
        self.login_panel_sizer.Add(logo, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        self.login_panel_sizer.Add(self.api_key_input, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        self.login_panel_sizer.Add(self.upbit_link, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        self.login_panel_sizer.Add(self.login_button, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        
        self.login_panel.SetSizer(self.login_panel_sizer)
        
        self.sizer.Add(self.login_panel, flag=wx.ALIGN_CENTER | wx.ALL, border=10)
        self.sizer.Add(self.menu_panel, flag=wx.EXPAND | wx.TOP, border=0)
        
        self.dashboard_panel = DashboardPanel(self.panel)
        self.trade_panel = TradePanel(self.panel)
        self.backtest_panel = BacktestPanel(self.panel)
        
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
    
    def on_login(self, event):
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

if __name__ == "__main__":
    app = wx.App(False)
    frame = MyFrame()
    app.MainLoop()