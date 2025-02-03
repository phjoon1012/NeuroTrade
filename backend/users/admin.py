from django.contrib import admin
from .models import User, Bot, Trade, BotStatistics

@admin.register(User)
class UserAdmin(admin.ModelAdmin):  # Revert back to ModelAdmin to avoid default UserAdmin expectations
    list_display = ('username', 'email', 'is_subscribed', 'created_at')
    search_fields = ('username', 'email')
    list_filter = ('is_subscribed',)
    ordering = ('username',)

    # Customizing fields shown in the add and edit user forms
    fields = ('username', 'email', 'password', 'api_key', 'api_secret', 'is_subscribed', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'created_at', 'updated_at')
    
    # Ensure password is displayed as a hashed value (read-only) when editing
    readonly_fields = ('last_login', 'created_at', 'updated_at')

    def save_model(self, request, obj, form, change):
        if form.cleaned_data.get('password') and not obj.password.startswith('pbkdf2_'):
            obj.set_password(form.cleaned_data['password'])  # Hash password before saving
        if form.cleaned_data.get('api_secret') and not obj.api_secret.startswith('pbkdf2_'):
            obj.set_api_secret(form.cleaned_data['api_secret'])
        super().save_model(request, obj, form, change)

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