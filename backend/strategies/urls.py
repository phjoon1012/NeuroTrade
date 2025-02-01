from django.urls import path
from . import views

urlpatterns = [
    path('', views.strategy_list, name='strategy_list'),
]