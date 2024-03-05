from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    listened_album_ids = models.ManyToManyField('self', symmetrical=False, related_name='saved_by')
    followed_users = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    saved_artists = models.ManyToManyField('Artist', related_name='saved_by')
    saved_releases = models.ManyToManyField('Release', related_name='saved_by')

    def __str__(self):        return self.user.username


class Artist(models.Model): #foreign key points to profile
    mb_id = models.CharField(max_length=36, unique = True, help_text="MusicBrainz ID")
    artist_name = models.CharField(max_length=100)

    def __str__(self):        return self.artist_name


class Album(models.Model): #foreign key points to artist
    mb_id = models.CharField(max_length=36, unique = True, help_text="MusicBrainz ID")
    album_name = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    release_date = models.DateField()

    def __str__(self):        return self.album_name

class Release(models.Model):  #foreign key points to album
    mb_id = models.CharField(max_length=36, unique = True, help_text="MusicBrainz ID")
    title = models.CharField(max_length=100)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='releases')

    def __str__(self):        return self.title 









    