from .common import MatchDetailsSerializer
from match.serializers.common import MatchSerializer

class PopulatedMatchDetailSerializer(MatchDetailsSerializer):
    match = MatchSerializer()