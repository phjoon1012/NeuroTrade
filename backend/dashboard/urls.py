# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.dashboard_home, name='dashboard_home'),
# ]

from django.urls import path
from .views import recent_trades

urlpatterns = [
    path('recent-trades/', recent_trades, name='recent_trades'),
]


 






