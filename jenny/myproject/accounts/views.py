from django.shortcuts import render

# Create your views here.
# accounts/views.py
import os
import requests
import uuid
import jwt
from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse

def get_accounts(request):
    access_key = settings.UPBIT_OPEN_API_ACCESS_KEY
    secret_key = settings.UPBIT_OPEN_API_SECRET_KEY
    server_url = settings.UPBIT_OPEN_API_SERVER_URL

    # JWT 토큰 생성
    payload = {
        'access_key': access_key,
        'nonce': str(uuid.uuid4()),
    }
    jwt_token = jwt.encode(payload, secret_key)
    authorization = 'Bearer {}'.format(jwt_token)
    
    headers = {
        'Authorization': authorization,
    }

    # API 요청
    res = requests.get(f'{server_url}/v1/accounts', headers=headers)

    if res.status_code == 200:
        accounts = res.json()
        return render(request, 'accounts/accounts.html', {'accounts': accounts})
    else:
        return JsonResponse({'error': 'Failed to fetch accounts'}, status=res.status_code)