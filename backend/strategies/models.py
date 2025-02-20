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



from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db.models import Count, Sum, Avg

# Signal to update BotStatistics after saving a Trade
@receiver(post_save, sender=Trade)
def update_bot_statistics_after_trade_save(sender, instance, created, **kwargs):
    bot = instance.bot
    total_trades = Trade.objects.filter(bot=bot).count()
    wins = Trade.objects.filter(bot=bot, profit_loss__gt=0).count()
    win_rate = (wins / total_trades * 100) if total_trades > 0 else 0
    avg_trading_rate = Trade.objects.filter(bot=bot).values('user').annotate(trade_count=Count('id')).aggregate(Avg('trade_count'))['trade_count__avg']
    total_trade_volume = Trade.objects.filter(bot=bot).aggregate(Sum('amount'))['amount__sum'] or 0
    number_of_users = Trade.objects.filter(bot=bot).values('user').distinct().count()

    bot_stats, created = BotStatistics.objects.get_or_create(bot=bot)
    bot_stats.total_trades = total_trades
    bot_stats.win_rate = win_rate
    bot_stats.avg_trading_rate = avg_trading_rate or 0
    bot_stats.total_trade_volume = total_trade_volume
    bot_stats.number_of_users = number_of_users
    bot_stats.save()


    all_bots = Bot.objects.all()
    for bot in all_bots:
        if not Trade.objects.filter(bot=bot).exists():
            # 해당 봇에 대한 통계를 0으로 초기화
            bot_stats, created = BotStatistics.objects.get_or_create(bot=bot)
            bot_stats.total_trades = 0
            bot_stats.win_rate = 0
            bot_stats.avg_trading_rate = 0
            bot_stats.total_trade_volume = 0
            bot_stats.number_of_users = 0
            bot_stats.save()
# Signal to update BotStatistics after deleting a Trade
@receiver(post_delete, sender=Trade)
def update_bot_statistics_after_trade_delete(sender, instance, **kwargs):
    bot = instance.bot
    update_bot_statistics_after_trade_save(sender, instance, created=False)
