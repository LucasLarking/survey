from datetime import timedelta
from rest_framework import serializers
from .models import Question, Survey, Option, Vote, Interaction, Member, InteractionItem
from django.http import HttpResponseRedirect
from rest_framework.exceptions import PermissionDenied
from rest_framework import permissions
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from django.db.models import Count
from datetime import timedelta, date, datetime
from django.utils import timezone
from django.db import transaction
from django.db.models import Q
from django.db.models import Avg, F


class SurveySerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ['id', 'survey', 'description', 'user']
        read_only_fields = ['id', 'user']
        partial = False

    def get_question_count(self, instance):
        try:
            return instance.questions.count()
        except AttributeError:
            return 0

    def save(self, **kwargs):
        request = self.context['request']

        if request.method == 'POST':

            self.instance = Survey.objects.create(
                survey=self.validated_data['survey'],
                description=self.validated_data['description'],
                user=request.user
            )
        if request.method == 'PATCH':

            survey_obj = Survey.objects.get(id=self.context['survey'])
            print('survey', survey_obj.user, 'user', request.user)
            if survey_obj.user == request.user:
                survey_obj.survey = self.validated_data['survey']
                survey_obj.description = self.validated_data['description']
                survey_obj.save()
            else:
                raise serializers.ValidationError(
                    'You are not the owner of this survey')

    # def destroy(self, instance):
    #     print('instacn', instance)
    #     survey = self.instance
    #     request = self.context['request']

    #     if survey.user == request.user:
    #         survey.delete()
    #     else:
    #         raise serializers.ValidationError('You are not the owner of this survey')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['option', 'question']

    def save(self, **kwargs):
        request = self.context['request']
        if request.method == 'POST':

            print(self.context)
            self.instance = Vote.objects.create(
                option=Option.objects.get(id=self.context['option']),
                question=Question.objects.get(id=self.context['question']),
            )
            questionObj = Question.objects.get(id=self.context['question'])
            surveyObj = Survey.objects.get(id=questionObj.survey.id)
            smallest_question = Question.objects.filter(
                survey=surveyObj).order_by('id').first()
            if questionObj.id == smallest_question.id:
                print('adasd')
                interaction = Interaction.objects.create(
                    survey=surveyObj
                )
            # return self.instance


class OptionSerializer(serializers.ModelSerializer):
    vote_count = serializers.SerializerMethodField()

    class Meta:
        model = Option
        fields = ['id', 'option', 'question', 'vote_count']
        read_only_fields = ['id', 'question', 'vote_count']

    def get_vote_count(self, instance):
        return instance.votes.count()

    def save(self, **kwargs):

        request = self.context['request']

        if request.method == 'POST':
            survey_obj = Question.objects.get(
                id=self.context['question']).survey
            if survey_obj.user == request.user:
                self.instance = Option.objects.create(
                    question=Question.objects.get(id=self.context['question']),
                    option=self.validated_data['option'],

                )
                return self.instance
            raise serializers.ValidationError(
                'You are not the owner of this survey')

        if request.method == 'PATCH':
            survey_obj = Question.objects.get(
                id=self.context['question']).survey
            if survey_obj.user == request.user:

                self.instance = Option.objects.get(id=self.context['option'])
                self.instance.option = self.validated_data['option']
                self.instance.save()
                return self.instance
            raise serializers.ValidationError(
                'You are not the owner of this survey')


class QuestionSerializer(serializers.ModelSerializer):
    # options = OptionSerializer(many=True, read_only=False)

    class Meta:
        model = Question
        fields = ['id', 'question', 'survey']
        read_only_fields = ['id', 'survey']
        partial = False

    def save(self, **kwargs):
        print('asdasd')
        request = self.context['request']

        if request.method == 'POST':
            survey_obj = Survey.objects.get(id=self.context['survey'])

            if survey_obj.user == request.user:
                self.instance = Question.objects.create(
                    survey=Survey.objects.get(id=self.context['survey']),
                    question=self.validated_data['question'],

                )
                return self.instance
            raise serializers.ValidationError(
                'You are not the owner of this survey')
        if request.method == 'PATCH':
            survey_obj = Survey.objects.get(id=self.context['survey'])

            if survey_obj.user == request.user:

                questionText = self.validated_data['question']
                question_id = self.context['question']

                self.instance = Question.objects.get(id=question_id)
                self.instance.question = questionText
                self.instance.save()

                return self.instance
            raise serializers.ValidationError(
                'You are not the owner of this survey')

class ExtendedQuestionSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()
    class Meta:
        model = Question
        fields = ['id', 'question', 'survey', 'options']
        read_only_fields = ['id', 'survey', 'options']


    def get_options(self, instance):
        options = instance.options.all()
        serializer = OptionSerializer(options, many=True)
        return serializer.data

class TotalViewSerialiser(serializers.ModelSerializer):
    vote_count = serializers.SerializerMethodField()

    class Meta:
        model = Option
        fields = ['id', 'option', 'vote_count']

    def get_vote_count(self, obj):
        return obj.votes.count()


class FullSurveySerializer(serializers.ModelSerializer):

    question_count = serializers.SerializerMethodField()
    interaction_dates = serializers.SerializerMethodField()
    interaction_data = serializers.SerializerMethodField()
    interaction_count = serializers.SerializerMethodField()
    daily_interaction_count = serializers.SerializerMethodField()
    interaction_count_this_week = serializers.SerializerMethodField()
    completion_rate = serializers.SerializerMethodField()
    average_completion_time = serializers.SerializerMethodField()
    # Completion Rate
    # Average time to complete

    class Meta:
        model = Survey
        fields = [
            'id',
            'user',
            'survey',
            'description',
            'question_count',
            'interaction_dates',
            'interaction_data',
            'interaction_count',
            'daily_interaction_count',
            'interaction_count_this_week',
            'completion_rate',
            'average_completion_time',

        ]
        read_only_fields = [
            'id',
            'user',
            'question_count',
            'interaction_dates',
            'interaction_data',
            'interaction_count',
            'daily_interaction_count',
            'interaction_count_this_week',
            'completion_rate',
            'average_completion_time'
        ]

    def get_question_count(self, instance):
        return instance.questions.count()

    def get_interaction_dates(self, instance):
        interactions = instance.interactions.all()
        if interactions.exists():
            first_interaction = interactions.first().completed
            last_interaction = interactions.last().completed
            time_difference = last_interaction - first_interaction
            interval = time_difference / 20
            dates = [first_interaction + interval * i for i in range(21)]
            # Replace the last date with the last_interaction
            dates[-1] = last_interaction
            return dates
        return []

    def get_interaction_data(self, instance):
        interactions = instance.interactions.all()
        if interactions.exists():
            first_interaction = interactions.first().completed
            last_interaction = interactions.last().completed
            time_difference = last_interaction - first_interaction
            interval = time_difference / 20
            data = []
            for i in range(20):
                start_time = first_interaction + interval * i
                end_time = first_interaction + interval * (i + 1)
                count = interactions.filter(
                    completed__gte=start_time, completed__lt=end_time).count()
                data.append(count)
            # Append count of last interaction
            data.append(interactions.filter(
                completed__gte=last_interaction).count())
            return data
        return []

    def get_interaction_count(self, instance):
        # print('coint', instance.interactions.count())
        try:
            return instance.interactions.count()
        except AttributeError:
            return 0

    def get_daily_interaction_count(self, instance):
        try:
            first_interaction = instance.interactions.first().completed
        except AttributeError:
            return 0
        last_interaction = instance.interactions.last().completed
        time_difference = (last_interaction - first_interaction).days
        interaction_cont = instance.interactions.count()

        if time_difference == 0:
            return interaction_cont
        return int(interaction_cont // time_difference)

    def get_interaction_count_this_week(self, instance):
        seven_days_ago = timezone.now() - timedelta(days=7)
        try:
            qs = instance.interactions.filter(
                completed__gte=seven_days_ago).count()
        except AttributeError:
            return 0
        print('last 7', qs)
        return qs

    def get_completion_rate(self, instance):
        completed = Interaction.objects.filter(
            Q(completed__isnull=False, survey=instance)).count()
        total = Interaction.objects.filter(Q(survey=instance)).count()
        completion_rate = round(((completed / total) * 100), 2)

        return completion_rate

    def get_average_completion_time(self, instance):
        average_time_difference = Interaction.objects.exclude(completed__isnull=True).annotate(
            time_difference=F('completed') - F('started')
        ).aggregate(avg_time=Avg('time_difference'))
        print(average_time_difference)
        return average_time_difference


class MemberSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'phone', 'user_id']


class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = ['id', 'started', 'completed', 'survey']
        read_only_fields = ['id', 'started', 'completed', 'survey']

    def save(self, **kwargs):
        request = self.context['request']
        print(request)
        if request.method == 'POST':
            if Interaction.objects.filter(user=request.user, survey=self.context['survey']).exists():
                interactions = Interaction.objects.filter(
                    user=request.user, survey=self.context['survey'])
                self.instance = interactions[0]
                for interaction in interactions[1:]:
                    interaction.delete()
            else:
                self.instance = Interaction.objects.create(
                    started=timezone.now(),
                    survey=Survey.objects.get(id=self.context['survey']),
                    user=request.user

                )
        if request.method == 'PATCH':
            interaction_obj = Interaction.objects.get(
                id=self.context['interaction'])
            print(interaction_obj)


class InteractionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteractionItem
        fields = ['id', 'option', 'question', 'interaction']
        read_only_fields = ['id', 'interaction']

    def save(self, **kwargs):
        request = self.context['request']
        print('ssadk')
        print(self.validated_data)
        question_id = self.validated_data['question']
        option_id = self.validated_data['option']

        interactions = Interaction.objects.filter(
            user=request.user, survey=self.context['survey'])

        for interaction in interactions:
            if interaction.id != int(self.context['interaction']):
                interaction.delete()
            else:
                interaction_obj = interaction

        if InteractionItem.objects.filter(question=question_id).exists():
            self.instance = InteractionItem.objects.get(question=question_id)
            self.instance.option = option_id
            self.instance.save()
        else:
            self.instance = InteractionItem.objects.create(
                option=option_id,
                question=question_id,
                interaction=interaction_obj
            )

        return self.instance


class GetInteractionItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteractionItem
        fields = ['id', 'option', 'question', 'interaction']
        read_only_fields = ['id', 'option', 'question', 'interaction']


class InteractionSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = []

    def save(self, **kwargs):
        with transaction.atomic():
            interaction_obj = Interaction.objects.get(
                id=self.context['interaction'])
            question_count = interaction_obj.survey.questions.count()

            interaction_obj.completed = datetime.now()
            interaction_obj.save()

            interactionItems = InteractionItem.objects.select_related(
                'option__question').filter(interaction=interaction_obj)

            if not len(interactionItems) == question_count:
                msg = 'Number of votes did not match number of questions'
                raise serializers.ValidationError(msg)

            votes = [
                Vote(
                    option=item.option,
                    question=item.question,
                ) for item in interactionItems
            ]

            Vote.objects.bulk_create(votes)
            return self.instance
