<<<<<<<< HEAD:w01/diary/migrations/0008_alter_content_cdate_remove_content_group_diary_and_more.py
# Generated by Django 5.1.3 on 2024-12-17 03:41
========
# Generated by Django 5.1.3 on 2024-12-17 03:42
>>>>>>>> 209eb47337ba90084911f0ba394cc0b016987a86:w01/diary/migrations/0004_remove_content_group_diary_content_group_diary.py

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0007_alter_content_cdate'),
    ]

    operations = [
<<<<<<<< HEAD:w01/diary/migrations/0008_alter_content_cdate_remove_content_group_diary_and_more.py
        migrations.AlterField(
            model_name='content',
            name='cdate',
            field=models.DateField(default=django.utils.timezone.now),
        ),
========
>>>>>>>> 209eb47337ba90084911f0ba394cc0b016987a86:w01/diary/migrations/0004_remove_content_group_diary_content_group_diary.py
        migrations.RemoveField(
            model_name='content',
            name='group_diary',
        ),
        migrations.AddField(
            model_name='content',
            name='group_diary',
            field=models.ManyToManyField(blank=True, to='diary.groupdiary'),
        ),
    ]
