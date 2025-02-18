from django.http import JsonResponse
<<<<<<< HEAD
from django.views import View
import requests
import jwt
import uuid
from .models import User
=======
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from cryptography.fernet import Fernet
from django.conf import settings
import pyupbit
import jwt
import uuid
import requests
from datetime import datetime
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods

User = get_user_model()

def encrypt_key(key):
    """API 키를 암호화합니다."""
    if not key:
        return None
    return settings.FERNET.encrypt(key.encode()).decode()

def decrypt_key(encrypted_key):
    """암호화된 API 키를 복호화합니다."""
    if not encrypted_key:
        return None
    try:
        return settings.FERNET.decrypt(encrypted_key.encode()).decode()
    except:
        return None

@ensure_csrf_cookie
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    
    if request.method == 'GET':
        return Response({
            'username': user.username,
            'email': user.email,
            'api_key': '*' * 8 if user.api_key else None,
            'api_secret': '*' * 8 if user.api_secret else None,
            'created_at': user.created_at,
        })
    
    # PUT 요청 처리
    api_key = request.data.get('api_key')
    api_secret = request.data.get('api_secret')
    
    try:
        if api_key and api_secret:
            upbit = pyupbit.Upbit(api_key, api_secret)
            upbit.get_balances()  # 실제 API 호출로 키 유효성 검증
            
            user.api_key = encrypt_key(api_key)
            user.api_secret = encrypt_key(api_secret)
            user.save()
    except Exception as e:
        return Response({
            'error': '유효하지 않은 API 키입니다. 다시 확인해주세요.'
        }, status=400)
    
    return Response({
        'username': user.username,
        'email': user.email,
        'api_key': '*' * 8 if user.api_key else None,
        'api_secret': '*' * 8 if user.api_secret else None,
        'created_at': user.created_at,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_balance(request):
    user = request.user
    
    # API 키 복호화
    api_key = decrypt_key(user.api_key)
    api_secret = decrypt_key(user.api_secret)
    
    print("Decrypted API Key:", api_key is not None)  # 디버깅용 (키 자체는 출력하지 않음)
    print("Decrypted Secret Key:", api_secret is not None)
    
    if not (api_key and api_secret):
        return Response({'error': 'API 키가 설정되지 않았습니다.'}, status=400)
    
    try:
        # Upbit API 호출
        upbit = pyupbit.Upbit(api_key, api_secret)
        balances = upbit.get_balances()
        
        print("Raw balances:", balances)  # 디버깅용
        
        # 잔고 정보 가공
        formatted_balances = []
        for balance in balances:
            try:
                current_price = None
                if balance['currency'] != 'KRW':
                    ticker = f"KRW-{balance['currency']}"
                    current_price = upbit.get_current_price(ticker)
                
                formatted_balances.append({
                    'currency': balance['currency'],
                    'balance': float(balance['balance']),
                    'avg_buy_price': float(balance['avg_buy_price']) if balance['avg_buy_price'] else 0,
                    'current_price': current_price if current_price else 1
                })
            except Exception as e:
                print(f"Error processing balance for {balance['currency']}: {str(e)}")
                continue
        
        print("Formatted balances:", formatted_balances)  # 디버깅용
        return Response(formatted_balances)
        
    except Exception as e:
        print("Error fetching balance:", str(e))  # 디버깅용
        return Response({
            'error': f'잔고 정보를 가져오는데 실패했습니다: {str(e)}'
        }, status=400)
>>>>>>> feature/회원_정보_수정

def dashboard_home(request):
    return JsonResponse({'message': 'Dashboard endpoint is working!'})

class BalanceView(View):
    # 1. 사용자 잔고 확인
    def get_user_balance(self, requests):
        # 2. 사용자 모델에서 사용자 정보 접근
        # todo: 사용자 정보를 requests.user로 가져오기 vs User에서 가져오기
        user = requests.user
        # user = User.objects.get(username='test') # ??
        access_key = user.api_key # 접근 권한 부여
        secret_key = user.api_secret # jwt 서명 생성 및 인증
        
        # 3. 계좌 정보 API 요청 URL 설정
        server_url = 'https://api.upbit.com/v1/accounts'
        
        # 4. JWT 토큰 생성 
        # (두 개제간에 정보를 안전하게 전송하기 위한 표준)
        payload = {
            'access_key': access_key, 
            'nonce': str(uuid.uuid4()),
        }
        
        # 5. JWT encoding
        # 보안/신뢰성/효율성
        jwt_token = jwt.encode(payload, secret_key)
        authorization = 'Bearer {}'.format(jwt_token)
        
        # 6. 요청 헤더 설정 (API 호출시 인증 정보를 담아서 요청)
        headers = {
        'Authorization': authorization,
        }
        # 7. API 호출
        response = requests.get(server_url, headers=headers)
        # 8. 응답 처리
        if response.status_code == 200:
            return JsonResponse(response.json(), safe=False)
        else:
            return JsonResponse({'error': response.json()}, 
                                status=response.status_code)