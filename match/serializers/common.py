from rest_framework.serializers import ModelSerializer
from friend.serializers.common import FriendSerializer
from ..models import Match

class MatchSerializer(ModelSerializer):
    friends = FriendSerializer(many=True)
    class Meta:
        model = Match
        fields = '__all__'