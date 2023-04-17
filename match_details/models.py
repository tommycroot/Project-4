from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class MatchDetails(models.Model):
    match = models.ForeignKey(
        'match.Match',
        on_delete=models.CASCADE,
        related_name='match_details'
    )
    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='match_details'
    )
    friends = models.ForeignKey(
        'friend.Friends',
        on_delete=models.CASCADE,
        related_name='match_details',
        blank=True,
        null=True,
    )
    photos = models.URLField(validators=[URLValidator()], blank=True, null=True)
    
