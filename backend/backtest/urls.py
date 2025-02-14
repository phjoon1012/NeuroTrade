from django.urls import path
from . import views
from .views import run_backtest


urlpatterns = [
        path('run/', run_backtest, name='run_backtest'),
]