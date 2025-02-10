from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.response import Response
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .serializers import UserSerializer


import json



@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Only authenticated users can log out
def logout_view(request):
    logout(request)  # Clear the session
    return JsonResponse({'message': 'Logged out successfully'}, status=200)


@csrf_exempt  # Allow CSRF exemption for login to start session
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            print(f"User {username} logged in. Session Key: {request.session.session_key}")

            # Return CSRF token and session details
            response = JsonResponse({'message': 'Login successful!'}, status=200)
            response.set_cookie('csrftoken', get_token(request))  # Send CSRF token as cookie
            return response
        else:
            print(f"Authentication failed for {username}")
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only logged-in users can access
def user_info_view(request):
    print("User Info View Accessed")  # Debug
    print("Authenticated User:", request.user)
    
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'api_key': getattr(user, 'api_key', ''),
        'api_secret': getattr(user, 'api_secret', ''),
        'trading_preference': getattr(user, 'trading_preference', ''),
    })


def user_count_view(request):
    User = get_user_model()
    user_count = User.objects.count()
    return JsonResponse({'user_count': user_count})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email
    })

@api_view(['GET'])
def get_user_profile(request):
    if request.user.is_authenticated:
        return Response({
            'username': request.user.username,
            'email': request.user.email,
            'profile_picture': request.user.profile_picture,
        })
    return Response({'error': 'User not authenticated'}, status=401)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)







from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
import jwt
import time

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # ✅ Ensures user is logged in
def get_upbit_balance(request):
    user = request.user

    if not user.api_key or not user.api_secret:
        return Response({"error": "API key and secret are required"}, status=400)

    access_key = user.api_key
    secret_key = user.api_secret
    print(access_key)
    print(secret_key)

    server_url = "https://api.upbit.com"

    try:
        payload = {
            "access_key": access_key,
            "nonce": str(int(time.time() * 1000))
        }
        jwt_token = jwt.encode(payload, secret_key, algorithm="HS256")

        headers = {
            "Authorization": f"Bearer {jwt_token}",
        }

        response = requests.get(f"{server_url}/v1/accounts", headers=headers)

        if response.status_code != 200:
            return Response({"error": f"Upbit API error: {response.text}"}, status=response.status_code)

        return Response(response.json(), status=200)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=500)