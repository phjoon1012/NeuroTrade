from django.http import JsonResponse

<<<<<<< HEAD
def strategy_list(request):
    return JsonResponse({'message': 'Strategies endpoint is working!'})
=======
from django.shortcuts import render
from users import models as user_model  # BotStatistics 모델을 가져옵니다.

def strategy_list(request):
    # 모든 BotStatistics 객체 가져오기
    stats = user_model.BotStatistics.objects.all()

    # 데이터를 템플릿에 전달하지 않고, JSON 형태로 반환하려면 아래와 같이 설정
    from django.http import JsonResponse
    data = list(stats.values('bot__name', 'total_trades', 'win_rate', 'avg_trading_rate', 'total_trade_volume', 'number_of_users', 'updated_at'))
    
    return JsonResponse(data, safe=False)
>>>>>>> f28d7c64b9f09a5318a3482598d0f4d5ce9e3a7f
