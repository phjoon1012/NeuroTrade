from django.urls import path
from . import views
from .views import strategy_list,user_trades
from .views import confirm_strategy

urlpatterns = [
    path('', strategy_list, name='strategy_list'),
    path('user-trades/', user_trades, name="user_trades"),
    path('strategies/', confirm_strategy, name="confirm_strategy"),  # New endpoint

]