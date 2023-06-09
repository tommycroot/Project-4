# Generated by Django 4.2 on 2023-04-20 09:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('match', '0002_match_red_cards_alter_match_assists_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='match',
            name='away_lineup',
        ),
        migrations.RemoveField(
            model_name='match',
            name='home_lineup',
        ),
        migrations.AddField(
            model_name='match',
            name='notes',
            field=models.TextField(default=django.utils.timezone.now, max_length=300),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='match',
            name='assists',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='competition',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='match',
            name='goalscorers',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='red_cards',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='yellow_cards',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]
