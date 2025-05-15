# Create your views here.
from django.shortcuts import render,redirect
# imported our models
from django.core.paginator import Paginator

from ..models import Song
from ..utils import make_lyrics





def index_view_render(request):
    
    if request.method == 'POST':
        title = request.POST.get('title')
        artist = request.POST.get('artist')
        audio_file = request.FILES.get('audio_file')
        audio_link = request.POST.get('audio_link')
        duration = request.POST.get('duration')
        image = request.FILES.get('image')

        song = Song(
            title=title,
            artist=artist,
            audio_file=audio_file,
            audio_link=audio_link,
            duration=duration,
            image=image
        )
        song.save()  # lyrics will be auto-populated via save()

        return redirect(request.path)
    paginator= Paginator(Song.objects.all(),1)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    print(page_obj[0].lyrics)
    context={"page_obj":page_obj}
    return render(request,"home.html",context)