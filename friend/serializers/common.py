from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import Friends

class FriendSerializer(ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Friends
        fields = '__all__'