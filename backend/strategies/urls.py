from django.urls import path
from . import views
from .views import strategy_list


urlpatterns = [
    path('', strategy_list, name='strategy_list'),
]