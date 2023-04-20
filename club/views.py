from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers.common import ClubSerializer
from .models import Club
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from lib.exceptions import exceptions

class ClubListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def get(self, request):
        clubs = Club.objects.all() 
        serialized_clubs = ClubSerializer(clubs, many=True)
        print('GET /api/club/ endpoint HIT!')
        return Response(serialized_clubs.data)
    
    @exceptions
    def post(self, request):
        club = ClubSerializer(data=request.data)
        club.is_valid(raise_exception=True)
        club.save()
        return Response(club.data, status.HTTP_201_CREATED)
    
class ClubDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request, pk):
        club = Club.objects.get(pk=pk)
        serialized_club= ClubSerializer(club)
        return Response(serialized_club.data)