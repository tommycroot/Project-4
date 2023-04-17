from django.db import models

# Create your models here.
class Friends(models.Model):
    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='friends'
    )
    name = models.CharField(max_length=150)
