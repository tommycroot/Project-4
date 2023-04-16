from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import UserSerializer
from rest_framework import status
import jwt
 
from lib.exceptions import exceptions

class RegisterView(APIView):
    @exceptions
    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response(user_to_add.data, status.HTTP_201_CREATED)