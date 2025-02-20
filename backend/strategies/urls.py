from django.urls import path
from . import views
from .views import strategy_list,user_trades
from .views import confirm_strategy
from .views import subscribe_confirm
from .views import unsubscribe_confirm
urlpatterns = [
    path('', strategy_list, name='strategy_list'),
    path('user-trades/', user_trades, name="user_trades"),
    path('strategies/', confirm_strategy, name="confirm_strategy"),
    path('subscribe/', subscribe_confirm, name="subscribe"),
    path('unsubscribe/', unsubscribe_confirm, name="unsubscribe"),  # ✅ 구독 취소 엔드포인트 추가
]