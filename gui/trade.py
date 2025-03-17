import wx

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
