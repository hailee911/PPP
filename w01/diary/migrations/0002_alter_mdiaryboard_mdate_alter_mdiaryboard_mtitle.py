# Generated by Django 5.1.3 on 2024-12-16 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mdiaryboard',
            name='mdate',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='mdiaryboard',
            name='mtitle',
            field=models.CharField(default='나의 일기장', max_length=1000),
        ),
    ]