from django.http import JsonResponse

def backtesting_results(request):
    return JsonResponse({'message': 'Backtesting endpoint is working!'})
