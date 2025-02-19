from django.http import JsonResponse
from strategies.models import BotStatistics  # Ensure correct import
from strategies.models import Bot
def strategy_list(request):
    # Fetch all BotStatistics objects with related bot fields
    stats = BotStatistics.objects.select_related('bot').all()  # ✅ Use select_related to optimize query

    # Convert QuerySet to JSON
    data = list(stats.values(
        'bot__name', 
        'bot__description',  # ✅ Include bot's description
        'bot__premium',       # ✅ Include if the bot is premium or not
        'total_trades', 
        'win_rate', 
        'avg_trading_rate', 
        'total_trade_volume', 
        'number_of_users', 
        'updated_at'
    ))

    return JsonResponse(data, safe=False, json_dumps_params={'ensure_ascii': False})


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Trade
from .serializers import TradeSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_trades(request):
    user = request.user
    trades = Trade.objects.filter(user=user).order_by('-trade_time')  # Get user's trades
    serializer = TradeSerializer(trades, many=True)  # Serialize data
    return Response(serializer.data)


from django.views.decorators.csrf import csrf_exempt
import json
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_strategy(request):
    
    if request.method == 'POST':
        try:
            # Parse the request body
            #data = json.loads(request.body)
            strategy_name = request.data.get('bot__name')
            strategy_description = request.data.get('bot__description')

            user = request.user
            bot = Bot.objects.get(name=strategy_name)
            print(strategy_name)
            selected_strategy = {
                'name': strategy_name,
                'description': strategy_description,
            }
            user.bot =bot
            print(strategy_description)
            user.save()
            print("saved")
            return JsonResponse({"message": "Strategy confirmed", "selected_strategy": selected_strategy}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=400)



