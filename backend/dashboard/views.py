from django.http import JsonResponse
from django.views import View
import requests
import jwt
import uuid
from .models import User

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