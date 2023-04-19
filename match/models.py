from django.db import models
from django.core.validators import URLValidator

class Match(models.Model):
    season = models.CharField(max_length=50)
    date = models.DateField()
    result = models.CharField(max_length=50)
    competition = models.CharField(max_length=50)
    home_lineup = models.TextField(max_length=300, blank=True, null=True)
    away_lineup = models.TextField(max_length=300, blank=True, null=True)
    goalscorers = models.CharField(max_length=50, blank=True, null=True)
    assists = models.TextField(max_length=200, blank=True, null=True)
    yellow_cards = models.TextField(max_length=200, blank=True, null=True)
    home_team = models.ForeignKey(
        'club.Club',
        on_delete=models.CASCADE,
        related_name='home_matches'
    )
    away_team = models.ForeignKey(
        'club.Club',
        on_delete=models.CASCADE,
        related_name='away_matches'
    )
    friends = models.ManyToManyField(
        'friend.Friends',
        related_name='match',
        blank=True
    )
    photos = models.URLField(validators=[URLValidator()], blank=True, null=True)

    