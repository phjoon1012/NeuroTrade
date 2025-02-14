# users/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = User

        fields = ['username', 'email', 'api_key', 'api_secret', 'is_subscribed', 'created_at', 'profile_picture']