from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # Show username instead of ID

    class Meta:
        model = Feedback
        fields = ['id', 'user', 'rating', 'comment', 'created_at']