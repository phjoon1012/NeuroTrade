from django.db import models
from django.contrib.auth import get_user_model

# users/models.py에서 User 모델을 가져옵니다.
# 현재 AUTH_USER_MODEL에 설정된 사용자 모델을 가져옵니다.
User = get_user_model()  