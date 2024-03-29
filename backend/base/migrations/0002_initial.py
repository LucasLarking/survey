# Generated by Django 4.2.3 on 2023-07-11 11:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='survey',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='question',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='base.survey'),
        ),
        migrations.AddField(
            model_name='option',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='base.question'),
        ),
        migrations.AddField(
            model_name='member',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='interactionitem',
            name='interaction',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='interactionItems', to='base.interaction'),
        ),
        migrations.AddField(
            model_name='interactionitem',
            name='option',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.option'),
        ),
        migrations.AddField(
            model_name='interactionitem',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.question'),
        ),
        migrations.AddField(
            model_name='interaction',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='interactions', to='base.survey'),
        ),
        migrations.AddField(
            model_name='interaction',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='filterobj',
            name='option',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.option'),
        ),
        migrations.AddField(
            model_name='filterobj',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.question'),
        ),
        migrations.AddField(
            model_name='filterobj',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='filterObjs', to='base.survey'),
        ),
    ]
