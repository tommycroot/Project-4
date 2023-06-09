from rest_framework.serializers import ModelSerializer
from friend.serializers.common import FriendSerializer
from club.serializers.common import ClubSerializer
from ..models import Match

class MatchPostSerializer(ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'