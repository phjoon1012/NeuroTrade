# users/adapters.py

from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)
        extra_data = sociallogin.account.extra_data

        # Map Google OAuth data to custom user fields
        user.google_id = extra_data.get('id')
        user.profile_picture = extra_data.get('picture')

        # Ensure username and email are set correctly
        user.username = data.get('name', user.username)
        user.email = data.get('email', user.email)

        return user