from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Trade, BotStatistics
from django.db.models import Avg, Sum, Count

# Signal to update BotStatistics when a Trade is created or updated
from django.utils.timezone import timedelta

@receiver(post_save, sender=Trade)
def update_bot_statistics(sender, instance, **kwargs):
    bot = instance.bot
    trades = Trade.objects.filter(bot=bot)
    
    total_trades = trades.count()
    winning_trades = trades.filter(profit_loss__gt=0).count()
    win_rate = (winning_trades / total_trades * 100) if total_trades > 0 else 0

    # Fix the avg_trading_rate calculation
    # avg_trading_rate = trades.aggregate(Avg('trade_time'))['trade_time__avg']
    
    # if isinstance(avg_trading_rate, timedelta):
    #     avg_trading_rate = avg_trading_rate.total_seconds() / 3600  # Convert to hours

    total_trade_volume = trades.aggregate(Sum('amount'))['amount__sum'] or 0
    number_of_users = trades.values('user').distinct().count()

    BotStatistics.objects.update_or_create(
        bot=bot,
        defaults={
            'total_trades': total_trades,
            'win_rate': win_rate,
            # 'avg_trading_rate': avg_trading_rate or 0,  # Store as a float
            'total_trade_volume': total_trade_volume,
            'number_of_users': number_of_users
        }
    )

# Signal to update BotStatistics when a Trade is deleted
@receiver(post_delete, sender=Trade)
def delete_trade_update_statistics(sender, instance, **kwargs):
    """ Update BotStatistics when a Trade is deleted. """
    update_bot_statistics(sender, instance)