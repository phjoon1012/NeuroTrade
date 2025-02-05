# from django.http import JsonResponse

# def dashboard_home(request):
#     return JsonResponse({'message': 'Dashboard endpoint is working!'})


from django.http import JsonResponse
from .models import Trades
from django.utils.timezone import now

def recent_trades(request):
    """ 최근 10개의 봇을 이용한 거래 내역 반환 """
    trades = Trades.objects.select_related('bot').order_by('-trade_time')[:10]

    trade_list = [ 
        {
            'trade_time': trade.trade_time.strftime("%Y-%m-%d %H:%M"),
            'bot_name': trade.bot.name,
            'trade_type': trade.trade_type,
            'asset': trade.asset,
            'amount': float(trade.amount),
            'price': f"${trade.price:,.2f}",
            'profit_loss': f"{'+' if trade.profit_loss > 0 else ''}${trade.profit_loss:,.2f}"
        }
        for trade in trades
    ]

    return JsonResponse({'recent_trades': trade_list})





