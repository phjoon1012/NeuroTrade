from django.db import models
from django.contrib.auth.hashers import make_password, check_password
<<<<<<< HEAD

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

=======
from cryptography.fernet import Fernet

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


>>>>>>> f28d7c64b9f09a5318a3482598d0f4d5ce9e3a7f
# User Manager
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, api_secret=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        if api_secret:
            user.set_api_secret(api_secret)  # Hash API Secret
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
<<<<<<< HEAD
    api_key = models.CharField(max_length=255, blank=True, null=True)
    api_secret = models.CharField(max_length=255, blank=True, null=True)
    is_subscribed = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
=======
    
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
    
    # Timestamps
>>>>>>> f28d7c64b9f09a5318a3482598d0f4d5ce9e3a7f
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

<<<<<<< HEAD
    def set_api_secret(self, raw_api_secret):
        self.api_secret = make_password(raw_api_secret) 
        
=======
    # Methods for API secret handling
    def set_api_secret(self, raw_api_secret):
        self.api_secret = cipher_suite.encrypt(raw_api_secret.encode()).decode()

        self.api_secret = make_password(raw_api_secret)

>>>>>>> f28d7c64b9f09a5318a3482598d0f4d5ce9e3a7f
    def check_api_secret(self, raw_api_secret):
        return check_password(raw_api_secret, self.api_secret)

    def __str__(self):
        return self.username

# Bot Model
class Bot(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    premium = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# Trade Model
class Trade(models.Model):
    TRADE_TYPES = (('BUY', 'Buy'), ('SELL', 'Sell'))
    STATUS_CHOICES = (('OPEN', 'Open'), ('CLOSED', 'Closed'))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    trade_time = models.DateTimeField()
    trade_type = models.CharField(max_length=10, choices=TRADE_TYPES)
    asset = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=20, decimal_places=8)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    profit_loss = models.DecimalField(max_digits=20, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.asset} - {self.trade_type}"

# Bot Statistics Model
class BotStatistics(models.Model):
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    total_trades = models.IntegerField()
    win_rate = models.DecimalField(max_digits=5, decimal_places=2)
    avg_trading_rate = models.DecimalField(max_digits=10, decimal_places=2)
    total_trade_volume = models.DecimalField(max_digits=20, decimal_places=2)
    number_of_users = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Stats for {self.bot.name}"