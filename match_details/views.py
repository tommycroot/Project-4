from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from lib.exceptions import exceptions
from .models import MatchDetails
from .serializers.common import MatchDetailsSerializer
from .serializers.populated import PopulatedMatchDetailSerializer
from rest_framework.exceptions import PermissionDenied

class MatchDetailsListView(APIView):
    permission_classes = (IsAuthenticated,)
    @exceptions
    def get(self, request):
        match_details = MatchDetails.objects.filter(user=request.user)
        serialized_match_details = MatchDetailsSerializer(match_details, many=True) 
        return Response(serialized_match_details.data)

    @exceptions
    def post(self, request):
        match_details = MatchDetailsSerializer(data=request.data)
        match_details.is_valid(raise_exception=True)
        match_details.save()
        return Response(match_details.data, status.HTTP_201_CREATED)    

class MatchDetailsDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request, pk):
        match_details = MatchDetails.objects.get(pk=pk)
        if match_details.user != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_match_details = PopulatedMatchDetailSerializer(match_details)
        return Response(serialized_match_details.data)
    
    @exceptions
    def put(self, request, pk):
        match_details = MatchDetails.objects.get(pk=pk)
        if match_details.user != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_match_details = MatchDetailsSerializer(match_details, request.data, partial=True)
        serialized_match_details.is_valid(raise_exception=True)
        serialized_match_details.save()
        return Response(serialized_match_details.data)
        
    @exceptions
    def delete(self, request, pk):
        match_details = MatchDetails.objects.get(pk=pk)
        if match_details.user != request.user and not request.user.is_staff:
            raise PermissionDenied()
        match_details.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)