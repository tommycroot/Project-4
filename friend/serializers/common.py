from rest_framework.serializers import ModelSerializer
from ..models import Friends

class MatchDetailsSerializer(ModelSerializer):
    class Meta:
        model = Friends
        fields = '__all__'