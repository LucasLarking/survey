from datetime import timedelta
from rest_framework import serializers

from core.models import User
from .models import (
    Question,
    Survey,
    Option,
    Vote,
    Interaction,
    Member,
    InteractionItem,
    FilterObj
)
from django.conf import settings
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

from rest_framework import status
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


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


class SurveyTakerSerializer(serializers.ModelSerializer):
    # options = OptionSerializer(many=True, read_only=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
        read_only_fields = ['username', 'first_name', 'last_name', 'email']

    def save(self, **kwargs):
        request = self.context['request']
        print(self.context, **kwargs)
        # survey_obj = Survey.objects.get(id=self.context['survey'])

        # Vote.objects.filter(question__survey_id=self.context['survey'], user=self.context['request']).delete()
        if request.method == 'PATCH':
            survey_obj = Survey.objects.get(id=self.context['survey'])
            user_obj = User.objects.get(id=self.context['user'])
            qs = Vote.objects.filter(
                user=user_obj, question__survey=survey_obj).delete()
            Interaction.objects.get(user=user_obj).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


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
        # return instance.votes.fil.count()
        return instance.votes.filter(show=True).count()

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
    filterObjs = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'question', 'survey', 'options', 'filterObjs']
        read_only_fields = ['id', 'survey', 'options', 'filterObjs']

    def get_options(self, instance):
        options = instance.options.all()
        serializer = OptionSerializer(options, many=True)
        return serializer.data

    def get_filterObjs(self, instance):
        filterObjs = instance.questionFIlterObjs.all()
        serializer = FilterSerializer(filterObjs, many=True)
        return serializer.data


class TotalViewSerialiser(serializers.ModelSerializer):
    vote_count = serializers.SerializerMethodField()

    class Meta:
        model = Option
        fields = ['id', 'option', 'vote_count']

    def get_vote_count(self, obj):
        print('not_allowed', obj.question, obj.interactionitem_set.all())
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
    users = serializers.SerializerMethodField()
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
            'users',

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
            'average_completion_time',
            'users',
        ]

    def qs(self, instance):

        qs = instance.interactions.filter(
            ~Q(completed__isnull=True)).distinct()

        return qs

    def get_question_count(self, instance):
        return instance.questions.count()

    def get_users(self, instance):

        user_ids = instance.interactions.filter(
            ~Q(completed__isnull=True)).values_list('user', flat=True)
        users = User.objects.filter(id__in=user_ids)
        print('users', users)

        serializer = UserSerializer(users, many=True)
        return serializer.data

    def get_interaction_dates(self, instance):
        qs = self.qs(instance)

        if qs.exists():
            first_interaction = qs.first().completed
            last_interaction = qs.last().completed
            time_difference = last_interaction - first_interaction
            interval = time_difference / 20
            dates = [first_interaction + interval * i for i in range(21)]
            dates[-1] = last_interaction
            return dates
        return []

    def get_interaction_data(self, instance):
        qs = self.qs(instance)
        if qs.exists():
            first_interaction = qs.first().completed
            last_interaction = qs.last().completed
            time_difference = last_interaction - first_interaction
            interval = time_difference / 20
            data = []
            for i in range(20):
                start_time = first_interaction + interval * i
                end_time = first_interaction + interval * (i + 1)
                count = qs.filter(
                    completed__gte=start_time, completed__lt=end_time).count()
                data.append(count)

            data.append(qs.filter(
                completed__gte=last_interaction).count())
            return data
        return []

    def get_interaction_count(self, instance):
        qs = self.qs(instance)
        try:
            return qs.count()
        except AttributeError:
            return 0

    def get_daily_interaction_count(self, instance):

        qs = self.qs(instance)

        try:
            first_interaction = qs.first().completed
        except AttributeError:
            return 0
        last_interaction = qs.last().completed
        time_difference = (last_interaction - first_interaction).days
        interaction_cont = qs.count()

        if time_difference == 0:
            return interaction_cont
        return int(interaction_cont // time_difference)

    def get_interaction_count_this_week(self, instance):
        qs = self.qs(instance)
        seven_days_ago = timezone.now() - timedelta(days=7)
        try:
            qs = qs.filter(
                completed__gte=seven_days_ago).count()
        except AttributeError:
            return 0

        return qs

    def get_completion_rate(self, instance):
        qs = self.qs(instance)

        completed = qs.filter(
            Q(completed__isnull=False, survey=instance)).count()
        total = Interaction.objects.filter(Q(survey=instance)).count()
        completion_rate = round(((completed / total) * 100), 2)

        return completion_rate

    def get_average_completion_time(self, instance):
        qs = self.qs(instance)
        average_time_difference = qs.exclude(completed__isnull=True).annotate(
            time_difference=F('completed') - F('started')
        ).aggregate(avg_time=Avg('time_difference'))
        print(average_time_difference)
        if average_time_difference['avg_time']:
            average_time = average_time_difference['avg_time']
            average_time_minutes = average_time.total_seconds() / 60
            return round(average_time_minutes, 2)
        return 0


class MemberSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'phone', 'user_id']


class InteractionSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Interaction
        fields = ['id', 'started', 'completed', 'survey', 'questions', 'user']
        read_only_fields = ['id', 'started',
                            'completed', 'survey', 'questions']

    def get_questions(self, instance):
        qs = Vote.objects.filter(
            user=instance.user, question__survey=instance.survey)
        serializer = VoteSerializer(qs, many=True)
        return serializer.data

    def get_user(self, instance):
        user = instance.user
        serializer = UserSerializer(user)  # Replace with your User serializer
        return serializer.data

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


class GetInteractionSerializer(serializers.ModelSerializer):
    interaction = serializers.SerializerMethodField()
    # user = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'interaction', 'username', 'email']
        read_only_fields = ['interaction', 'username', 'email']

    def get_interaction(self, instance):
        request = self.context['request']
        print('###########################################################',
              self.validated_data, self.context)
        print(instance, 'instance', )
        interaction = Interaction.objects.get(
            user=self.context['user'], survey=Survey.objects.get(id=self.context['survey']))
        print('interaction', interaction)
        serializer = InteractionSerializer(interaction)
        return serializer.data

    # def get_user(self, instance):
    #     serializer = UserSerializer(self.context['request'].user)
    #     return serializer.data


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

        print('NUMBER #', Interaction.objects.filter(
            user=request.user, survey=self.context['survey']).count())
        interactions = Interaction.objects.filter(
            user=request.user, survey=self.context['survey']).first()

        if interactions:
            print('interaction', interactions)
            for interaction in Interaction.objects.filter(user=request.user, survey=self.context['survey']):
                if interaction.id != int(self.context['interaction']):
                    interaction.delete()
            #     else:
            #         interaction_obj = interaction
    # härrrrrrr

            if InteractionItem.objects.filter(question=question_id, interaction__user_id=request.user).exists():
                self.instance = InteractionItem.objects.get(
                    question=question_id, interaction__user_id=request.user)
                self.instance.option = option_id
                self.instance.save()
            else:
                self.instance = InteractionItem.objects.create(
                    option=option_id,
                    question=question_id,
                    interaction=interactions
                )

            return self.instance
        return 1


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
                    user=self.context['request'].user
                ) for item in interactionItems
            ]

            Vote.objects.bulk_create(votes)
            return self.instance


class FilterSerializer(serializers.ModelSerializer):
    option_text = serializers.SerializerMethodField()

    class Meta:
        model = FilterObj
        fields = ['id', 'option', 'question', 'survey', 'option_text']
        read_only_fields = ['id', 'survey', 'option_text']

    def save(self, **kwargs):
        print(self.context)

        request = self.context['request']
        if request.method == 'POST':
            print(self.context)
            surveyObj = Survey.objects.get(id=int(self.context['survey']))
            if FilterObj.objects.filter(question=self.validated_data['question']).exists():
                self.instance = FilterObj.objects.get(
                    question=self.validated_data['question'])

                if self.instance.option == self.validated_data['option']:
                    return self.instance
                else:
                    self.instance.option = self.validated_data['option']
                    self.instance.save()
                    vote_objs = Vote.objects.filter(question__survey=surveyObj)
                    vote_objs.update(show=True)

                    interactionInstances = surveyObj.interactions.all()
                    filterInstances = surveyObj.filterObjs.all()

                    for interactionInsance in interactionInstances:
                        for filterInstance in filterInstances:
                            question = filterInstance.question
                            option = filterInstance.option

                            # Check if the interaction contains the same option for the question
                            if not interactionInsance.interactionItems.filter(question=question, option=option).exists():
                                # Set all vote objects of that user in survey id = 1 to show = False
                                user = interactionInsance.user
                                Vote.objects.filter(
                                    user=user, question__survey=surveyObj
                                ).update(show=False)
                    return self.instance

            else:
                (self.instance, created) = FilterObj.objects.get_or_create(
                    survey=Survey.objects.get(id=int(self.context['survey'])),
                    option=self.validated_data['option'],
                    question=self.validated_data['question'],
                )

                survey_obj = Survey.objects.get(id=self.context['survey'])
                vote_objs = Vote.objects.filter(question__survey=survey_obj)

                interaction_items = InteractionItem.objects.filter(
                    option=self.instance.option)

                # Query to filter Interaction objects that have an interaction with the interaction items
                users = User.objects.filter(
                    interaction__interactionItems__in=interaction_items)
                votes = Vote.objects.exclude(
                    user__in=users, question__survey=survey_obj)

                votes.update(show=False)
                print('USERS: ', users)
                return self.instance

    def get_option_text(self, instance):
        return instance.option.option
