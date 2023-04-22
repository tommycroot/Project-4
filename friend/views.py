from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from lib.exceptions import exceptions
from rest_framework.exceptions import PermissionDenied
from .models import Friends
from .serializers.common import FriendSerializer

class FriendListView(APIView):
    permission_classes = (IsAuthenticated,)
    @exceptions
    def get(self, request):
        friends = Friends.objects.filter(owner_id=request.user)
        serialized_friends = FriendSerializer(friends, many=True) 
        return Response(serialized_friends.data)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @exceptions
    def post(self, request):
        friend = FriendSerializer(data={ **request.data, 'owner': request.user.id })
        friend.is_valid(raise_exception=True)
        friend.save(owner=request.user)
        return Response(friend.data, status.HTTP_201_CREATED)
    
class FriendDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request, pk):
        friend = Friends.objects.get(pk=pk)
        if friend.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_friend = FriendSerializer(friend)
        return Response(serialized_friend.data)
    
    @exceptions
    def put(self, request, pk):
        friend = Friends.objects.get(pk=pk)
        if friend.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_friends = FriendSerializer(friend, request.data, partial=True)
        serialized_friends.is_valid(raise_exception=True)
        serialized_friends.save()
        return Response(serialized_friends.data)
        
    @exceptions
    def delete(self, request, pk):
        friend = Friends.objects.get(pk=pk)
        if friend.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        friend.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

  