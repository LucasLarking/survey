import requests
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


# Create your models here.
class Member(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone = models.CharField(null=True, blank=True, max_length=255)
    # def __str__(self):
    #     return f"{self.user.first_name} {self.user.last_name}"

class Survey(models.Model):

    survey = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        permissions = [
            ('view_history', 'Can view history')
        ]

    def __str__(self) -> str:
        return self.survey


class Question(models.Model):

    survey = models.ForeignKey(
        Survey, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField(null=True, blank=True)
    total_votes = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.question


class Option(models.Model):

    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='options')
    option = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.option


class Vote(models.Model):
    option = models.ForeignKey(
        Option, on_delete=models.CASCADE, related_name='votes')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.question.question} - {self.option.option}"


class Interaction(models.Model):
    started = models.DateTimeField()
    completed =  models.DateTimeField(null=True, blank=True)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='interactions')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.survey.survey} - {str(self.started.date())}"

    class Meta:
        ordering = ['started']


class InteractionItem(models.Model):
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    interaction = models.ForeignKey(Interaction, on_delete=models.CASCADE, related_name='interactionItems')

    def __str__(self):
        return f"{self.question.question} - {self.option.option}"
