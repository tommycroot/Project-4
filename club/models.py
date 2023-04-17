from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Club(models.Model):
    home_club = models.ForeignKey(
        'match.Match',
        on_delete=models.CASCADE,
        related_name='home_team'
    )
    away_club = models.ForeignKey(
        'match.Match',
        on_delete=models.CASCADE,
        related_name='away_team'
    )
    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='club'
    )
    name = models.CharField(max_length=150)
    stadium = models.CharField(max_length=150)
    club_image = models.URLField(validators=[URLValidator()])