# Generated by Django 4.2 on 2023-04-20 09:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='club',
            name='stadium_image',
            field=models.URLField(default='http://image.jpg', validators=[django.core.validators.URLValidator()]),
            preserve_default=False,
        ),
    ]