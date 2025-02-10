from django.db import models
from django.conf import settings  # ✅ Recommended way# Create your models here.
class Bot(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    premium = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

# Bot Statistics Model
class BotStatistics(models.Model):
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    total_trades = models.IntegerField()
    win_rate = models.DecimalField(max_digits=5, decimal_places=2)
    avg_trading_rate = models.DecimalField(max_digits=10, decimal_places=2)
    total_trade_volume = models.DecimalField(max_digits=20, decimal_places=2)
    number_of_users = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Stats for {self.bot.name}"
    
# Trade Model
class Trade(models.Model):
    TRADE_TYPES = (('BUY', 'Buy'), ('SELL', 'Sell'))
    STATUS_CHOICES = (('OPEN', 'Open'), ('CLOSED', 'Closed'))

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)    
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    trade_time = models.DateTimeField()
    trade_type = models.CharField(max_length=10, choices=TRADE_TYPES)
    asset = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=20, decimal_places=8)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    profit_loss = models.DecimalField(max_digits=20, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.asset} - {self.trade_type}"
