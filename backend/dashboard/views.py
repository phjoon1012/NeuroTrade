from django.http import JsonResponse
from django.views import View
import requests
import jwt
import uuid
from .models import User

# from django.contrib.auth import get_user_model

# User = get_user_model()  # 사용자 모델을 가져옵니다

def dashboard_home(request):
    return JsonResponse({'message': 'Dashboard endpoint is working!'})

class BalanceView(View):
    def get_user_balance(self, requests):
        user = requests.user
        access_key = user.api_key
        secret_key = user.api_secret
        server_url = 'https://api.upbit.com/v1/accounts'
        # sha-256
        print(f"==api_key:{access_key}")
        payload = {
            'access_key': access_key,
            'nonce': str(uuid.uuid4()),
        }

        jwt_token = jwt.encode(payload, secret_key)
        authorization = 'Bearer {}'.format(jwt_token)
        headers = {
        'Authorization': authorization,
        }

        response = requests.get(server_url, headers=headers)
        
        if response.status_code == 200:
            print(f"==response:{response.json()}")
            return JsonResponse(response.json(), safe=False)
        else:
            return JsonResponse({'error': response.json()}, status=response.status_code)