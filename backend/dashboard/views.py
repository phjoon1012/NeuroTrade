from django.http import JsonResponse

def dashboard_home(request):
    return JsonResponse({'message': 'Dashboard endpoint is working!'})