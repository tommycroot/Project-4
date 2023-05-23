from rest_framework.serializers import ModelSerializer
from ..models import Match

class MatchUpdateSerializer(ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'