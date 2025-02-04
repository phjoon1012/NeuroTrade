from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.response import Response
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
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
   
    
    user = request.user

    
    return Response({
        'username': user.username,
        'email': user.email,
        'api_key': getattr(user, 'api_key', ''),
        'api_secret': getattr(user, 'api_secret', ''),
        'trading_preference': getattr(user, 'trading_preference', ''),
    })