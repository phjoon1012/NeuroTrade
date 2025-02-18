from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.update_profile, name='update_profile'),
    path('balance/', views.get_balance, name='get_balance'),
]