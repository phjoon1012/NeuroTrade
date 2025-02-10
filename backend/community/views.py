from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework import status


# ✅ Submit feedback
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is logged in
def submit_feedback(request):
    print(f"🔍 User making request: {request.user}")  # Debugging line

    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_403_FORBIDDEN)

    rating = request.data.get("rating", 5)
    comment = request.data.get("comment", "")

    feedback = Feedback.objects.create(user=request.user, rating=rating, comment=comment)
    
    return Response({
        "id": feedback.id,
        "user": request.user.username,
        "rating": feedback.rating,
        "comment": feedback.comment,
        "created_at": feedback.created_at
    }, status=status.HTTP_201_CREATED)

# ✅ Get all feedbacks
@csrf_exempt  # 🔥 Temporary fix for testing
@api_view(['GET'])
@permission_classes([AllowAny])  # Anyone can view feedback
def list_feedbacks(request):
    print("accesed")
    feedbacks = Feedback.objects.all().order_by('-created_at')  # Get latest first
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)