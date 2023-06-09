from rest_framework.serializers import ModelSerializer
from friend.serializers.common import FriendSerializer
from club.serializers.common import ClubSerializer
from ..models import Match

class MatchSerializer(ModelSerializer):
    friends = FriendSerializer(many=True)
    home_team = ClubSerializer(read_only=True)
    away_team = ClubSerializer(read_only=True)
    class Meta:
        model = Match
        fields = '__all__'