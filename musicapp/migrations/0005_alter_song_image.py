# Generated by Django 5.2 on 2025-05-15 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicapp', '0004_alter_song_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='image',
            field=models.ImageField(blank=True, default='default.png', null=True, upload_to='pictures/'),
        ),
    ]
