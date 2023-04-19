# Generated by Django 4.2 on 2023-04-19 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('friend', '0002_initial'),
        ('match', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='red_cards',
            field=models.TextField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='assists',
            field=models.TextField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='competition',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='match',
            name='friends',
            field=models.ManyToManyField(blank=True, related_name='match', to='friend.friends'),
        ),
        migrations.AlterField(
            model_name='match',
            name='goalscorers',
            field=models.TextField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='yellow_cards',
            field=models.TextField(blank=True, max_length=300, null=True),
        ),
    ]
