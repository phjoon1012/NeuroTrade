from django.urls import path
from . import views

urlpatterns = [
    path('', views.backtesting_results, name='backtesting_results'),
]