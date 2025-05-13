from django.urls import path

from .views.index_view import index_view_render

app_name="musicapp"
urlpatterns=[
    path("", index_view_render, name="home")
]