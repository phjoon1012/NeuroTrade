import wx

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
