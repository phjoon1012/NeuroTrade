from django.urls import path
from .views import login_view, user_info_view, logout_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),  # Add this line
    path('me/', user_info_view, name='user_info'),  # Endpoint to fetch user settings
]