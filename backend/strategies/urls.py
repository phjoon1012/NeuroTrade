from django.urls import path
from . import views
from .views import strategy_list,user_trades


urlpatterns = [
    path('', strategy_list, name='strategy_list'),
    path('user-trades/', user_trades, name="user_trades"),  # New endpoint

]