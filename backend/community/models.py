from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # User who posted
    rating = models.IntegerField(default=5)  # Rating (1-5)
    comment = models.TextField()  # Feedback text
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp

    def __str__(self):
        return f"{self.user.username}: {self.comment[:30]}..."