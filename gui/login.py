import wx

class LoginPanel(wx.Panel):
    def __init__(self, parent, on_login_callback):
        super().__init__(parent)
        
        self.on_login_callback = on_login_callback
        
        vbox = wx.BoxSizer(wx.VERTICAL)
        
        # 로고 이미지 로드 및 크기 조절
        logo_path = "C:/Users/Playdata/Downloads/로고_1.png"  # 업로드한 로고 파일 경로
        image = wx.Image(logo_path, wx.BITMAP_TYPE_PNG)
        image = image.Scale(80, 80, wx.IMAGE_QUALITY_HIGH)  # 크기를 80x80으로 조절
        logo_bitmap = wx.Bitmap(image)
        logo = wx.StaticBitmap(self, bitmap=logo_bitmap)

        self.api_key_input = wx.TextCtrl(self, style=wx.TE_PASSWORD, size=(200, -1))
        self.upbit_link = wx.Button(self, label="업비트 링크")
        self.login_button = wx.Button(self, label="로그인")
        
        self.login_button.Bind(wx.EVT_BUTTON, self.on_login)
        
        vbox.Add(logo, flag=wx.ALIGN_CENTER | wx.TOP, border=20)
        vbox.Add(self.api_key_input, flag=wx.ALIGN_CENTER | wx.TOP, border=20)
        vbox.Add(self.upbit_link, flag=wx.ALIGN_CENTER | wx.TOP, border=10)
        vbox.Add(self.login_button, flag=wx.ALIGN_CENTER | wx.TOP, border=10)
        
        self.SetSizer(vbox)

    def on_login(self, event):
        self.Hide()
        self.on_login_callback()
