from django.core.management.base import BaseCommand
from musicapp.models import Song
from django.core.files import File

class Command(BaseCommand):
    help = "Add seed songs to the database"

    def handle(self, *args, **kwargs):
        s = Song(
            title="ikikiiki",
            artist="Linkin Park",
            audio_link="https://example.com/in-the-end.mp3",
            duration="3:36",
            lyrics="It starts with one thing, I don't know why..."
        )

        audio_path = r"C:\Users\benac\Downloads\Linkin Park - In the End (Lyrics).mp3"

        with open(audio_path, 'rb') as audio_file:
            s.audio_file.save('in_the_end.mp3', File(audio_file), save=False)

        s.save()
        self.stdout.write(self.style.SUCCESS("🎵 Added 'In the End' to the database"))
