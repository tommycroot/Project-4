# Generated by Django 4.2 on 2023-04-19 12:16

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Club',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('stadium', models.CharField(max_length=150)),
                ('club_image', models.URLField(validators=[django.core.validators.URLValidator()])),
            ],
        ),
    ]
