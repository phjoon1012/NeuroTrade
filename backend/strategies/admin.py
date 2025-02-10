from django.contrib import admin
from .models import Bot, Trade, BotStatistics
# Register your models here.
@admin.register(Bot)
class BotAdmin(admin.ModelAdmin):
    list_display = ('name', 'premium', 'created_at')
    search_fields = ('name',)
    list_filter = ('premium',)

@admin.register(Trade)
class TradeAdmin(admin.ModelAdmin):
    list_display = ('user', 'bot', 'asset', 'trade_type', 'amount', 'profit_loss', 'status')
    search_fields = ('user__username', 'asset')
    list_filter = ('trade_type', 'status')

@admin.register(BotStatistics)
class BotStatisticsAdmin(admin.ModelAdmin):
    list_display = ('bot', 'total_trades', 'win_rate', 'avg_trading_rate', 'total_trade_volume', 'number_of_users')
    search_fields = ('bot__name',)
    list_filter = ('win_rate',)