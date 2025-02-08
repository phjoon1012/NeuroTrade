from django.contrib import admin
from django.urls import path
from dashboard.views import BalanceView
from . import views

urlpatterns = [
    path('', views.dashboard_home, name='dashboard_home'),
    path('api/balance/',BalanceView.as_view(),name='get_user_balance')
]