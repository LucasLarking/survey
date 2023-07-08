from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)


# class Member(models.Model):

#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

