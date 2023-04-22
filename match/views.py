from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from lib.exceptions import exceptions
from .models import Match
from .serializers.common import MatchSerializer
from rest_framework.exceptions import PermissionDenied

class MatchListView(APIView):
    permission_classes = (IsAuthenticated,)
    @exceptions
    def get(self, request):
        match = Match.objects.filter(owner_id=request.user)
        serialized_match = MatchSerializer(match, many=True) 
        return Response(serialized_match.data)
    
    @exceptions
    def post(self, request):
        match = MatchSerializer(data={ **request.data, 'owner': request.user.id })
        print(request)
        match.is_valid(raise_exception=True)
        match.save()
        return Response(match.data, status.HTTP_201_CREATED)
    


class MatchDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request, pk):
        match = Match.objects.get(pk=pk)
        serialized_match = MatchSerializer(match)
        return Response(serialized_match.data)
    
    @exceptions
    def put(self, request, pk):
        match = Match.objects.get(pk=pk)
        serialized_match = MatchSerializer(match, request.data, partial=True)
        serialized_match.is_valid(raise_exception=True)
        serialized_match.save()
        return Response(serialized_match.data)
        
    @exceptions
    def delete(self, request, pk):
        match = Match.objects.get(pk=pk)
        match.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
  