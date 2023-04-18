from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from lib.exceptions import exceptions
from .models import MatchDetails
from .serializers.common import MatchDetailsSerializer

class MatchDetailsListView(APIView):
    @exceptions
    def get(self, request):
        match_details = MatchDetails.objects.all()
        serialized_match_details = MatchDetailsSerializer(match_details, many=True) 
        return Response(serialized_match_details.data)
  