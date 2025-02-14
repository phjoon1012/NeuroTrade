from django.urls import path
from . import views
<<<<<<< HEAD

urlpatterns = [
    path('', views.strategy_list, name='strategy_list'),
=======
from .views import strategy_list


urlpatterns = [
    path('', strategy_list, name='strategy_list'),
>>>>>>> f28d7c64b9f09a5318a3482598d0f4d5ce9e3a7f
]