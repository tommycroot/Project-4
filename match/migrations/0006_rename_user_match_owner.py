# Generated by Django 4.2 on 2023-04-20 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('match', '0005_match_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='match',
            old_name='user',
            new_name='owner',
        ),
    ]
