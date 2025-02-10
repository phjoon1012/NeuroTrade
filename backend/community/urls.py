# backend/community/urls.py
from django.urls import path
from .views import submit_feedback, list_feedbacks

urlpatterns = [
    path('feedbacks/', list_feedbacks, name="list_feedbacks"),
    path('feedbacks/submit/', submit_feedback, name="submit_feedback"),
]