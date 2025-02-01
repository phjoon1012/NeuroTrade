from django.http import JsonResponse

def strategy_list(request):
    return JsonResponse({'message': 'Strategies endpoint is working!'})