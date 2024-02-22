from django.db import models

# Create your models here.
class RecordBin(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=120, default='')

    def __str__(self):
        return self.title
    
class Post(models.Model):
    name = models.CharField(max_length=10)
    def __str__(self):
        return f"Post: {self.name}"