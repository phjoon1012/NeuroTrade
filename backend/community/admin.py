from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'comment', 'created_at')  # Display fields in admin
    search_fields = ('user__username', 'comment')  # Allow searching by username and comment
    list_filter = ('rating', 'created_at')  # Add filters for rating and date
    ordering = ('-created_at',)  # Order by latest feedback first