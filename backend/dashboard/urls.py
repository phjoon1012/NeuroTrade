from django.contrib import admin
from django.urls import path
from dashboard.views import BalanceView
from . import views

urlpatterns = [
<<<<<<< HEAD
    path('', views.dashboard_home, name='dashboard_home'),
    path('api/balance/',BalanceView.as_view(),name='get_user_balance')
=======
    path('profile/', views.update_profile, name='update_profile'),
    path('balance/', views.get_balance, name='get_balance'),
>>>>>>> feature/회원_정보_수정
]