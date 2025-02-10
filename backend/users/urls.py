from django.urls import path
from .views import login_view, user_info_view, logout_view, user_count_view, get_user_info,user_profile, get_upbit_balance

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),  # Add this line
    path('me/', user_info_view, name='user_info'),  # Endpoint to fetch user settings
    path('count/', user_count_view, name='user_count'),
    path('api/users/me/', get_user_info, name='get_user_info'),
    path('profile/', user_profile, name='user-profile'),
    path('balance/', get_upbit_balance, name='get-upbit-balance'),  # ✅ Add this line

]