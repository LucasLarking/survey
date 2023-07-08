from django.contrib import admin
from .models import Survey, Question, Option, Vote, Interaction, Member, InteractionItem
# Register your models here.

admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Vote)
admin.site.register(Interaction)
admin.site.register(Member)
admin.site.register(InteractionItem)