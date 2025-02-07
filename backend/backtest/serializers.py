# backtesting/serializers.py
from rest_framework import serializers

class BacktestParameterSerializer(serializers.Serializer):
    ema_period = serializers.IntegerField(default=200)
    rsi_period = serializers.IntegerField(default=30)
    tp = serializers.FloatField(default=0.02)
    sl = serializers.FloatField(default=0.01)