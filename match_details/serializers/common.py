from rest_framework.serializers import ModelSerializer
from ..models import MatchDetails

class MatchDetailsSerializer(ModelSerializer):
    class Meta:
        model = MatchDetails
        fields = '__all__'