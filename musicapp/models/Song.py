from django.db import models
from ..utils import make_lyrics


# Create your models here.
class Song(models.Model):
    title= models.TextField()
    artist= models.TextField()
    image = models.ImageField(upload_to='pictures/', default='/media/default.png', blank=True, null=True)

    audio_file = models.FileField(blank=True,null=True)
    audio_link = models.CharField(max_length=200,blank=True,null=True)
    lyrics=models.JSONField(blank=True,null=True)
    duration=models.CharField(max_length=20)
    paginate_by=2

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.image:
            self.image = 'default.png'
        query = f"{self.title} {self.artist}" if self.artist else self.title
        try:
            self.lyrics = make_lyrics(query)
        except Exception as e:
            print(f"[LYRICS ERROR] {e}")
            self.lyrics = []
        super().save(*args, **kwargs)
            