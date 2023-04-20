from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Club(models.Model):
    name = models.CharField(max_length=150)
    stadium = models.CharField(max_length=150)
    club_image = models.URLField(validators=[URLValidator()])
    stadium_image = models.URLField(validators=[URLValidator()])