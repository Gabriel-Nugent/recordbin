from django.db import models

class User(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=30)
    mb_id = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Release(models.Model):
    title = models.CharField(max_length=120)
    type = models.CharField(max_length=20, default='')
    mb_id = models.CharField(max_length=50)

    def __str__(self):
        return self.name