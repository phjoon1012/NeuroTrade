from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # 현재 AUTH_USER_MODEL에 설정된 사용자 모델을 가져옵니다.

"""class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(max_length=254, unique=True)
    api_key = models.CharField(max_length=255, blank=True, null=True)
    api_secret = models.CharField(max_length=255, blank=True, null=True)
    is_subscribed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField()
    is_staff = models.BooleanField()
    is_superuser = models.BooleanField()
    last_login = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'users_user'  # 기존 데이터베이스의 테이블 이름을 명시합니다."""