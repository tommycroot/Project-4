from .common import MatchDetailSerializer
from match.serializers.common import MatchSerializer

class PopulatedMatchDetailSerializer(MatchDetailSerializer):
    match = MatchSerializer(many=True)