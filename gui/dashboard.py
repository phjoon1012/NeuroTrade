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
