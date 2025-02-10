from rest_framework import serializers
from .models import Trade

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = ['trade_time', 'trade_type', 'asset', 'amount', 'price', 'profit_loss', 'status']