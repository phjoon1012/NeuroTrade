from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from cryptography.fernet import Fernet
from strategies.models import Bot  # ✅ Import Bot model from the bots app

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# User Manager
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('Superuser must have is_staff=True.')
        if not extra_fields.get('is_superuser'):
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

# User Model
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    
    # OAuth-related fields
    google_id = models.CharField(max_length=255, blank=True, null=True)  # Google account ID
    profile_picture = models.URLField(blank=True, null=True)  # Google profile picture
    
    # API keys for trading
    api_key = models.CharField(max_length=255, blank=True, null=True)
    api_secret = models.CharField(max_length=255, blank=True, null=True)
    
    # Subscription and activity
    is_subscribed = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    bot = models.OneToOneField(Bot, on_delete=models.SET_NULL, null=True, blank=True, related_name="owner")

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()


    def __str__(self):
        return self.username


