from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from base.permissions import FullDjangoModelPermissions, ViewMemberHistoryPermission
from core.models import User
from .models import (
    Question,
    Survey,
    Option,
    Vote,
    Interaction,
    InteractionItem,
    Member,
    FilterObj
)
from django.db.models import Prefetch
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import mixins
from base.serializers import (
    ExtendedQuestionSerializer,
    FilterSerializer,
    FullSurveySerializer,
    GetInteractionItemsSerializer,
    GetInteractionSerializer,
    InteractionSubmitSerializer,
    OptionSerializer,
    QuestionSerializer,
    SurveySerializer,
    SurveyTakerSerializer,
    TotalViewSerialiser,
    VoteSerializer,
    MemberSerializer,
    InteractionSerializer,
    InteractionItemSerializer,

)
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    DjangoModelPermissionsOrAnonReadOnly,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
from datetime import datetime, timedelta
from random import randint
import random
from django.utils import timezone
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import Q
from django.db.models import Avg, F
from django.db.models import Count


class SurveyViewSet(ModelViewSet):

    http_method_names = ['get', 'patch', 'delete', 'head', 'option', 'post']
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.user != request.user:
            raise serializers.ValidationError(
                'You are not the owner of this survey')

        return super().destroy(request, *args, **kwargs)

    def get_serializer_context(self):
        print(self.kwargs)
        if self.request.method in ('PATCH', 'DELETE'):
            return {'request': self.request, 'survey': self.kwargs['pk']}
        return {'request': self.request}

    @action(detail=True, methods=['GET'], permission_classes=[IsAuthenticated])
    def expanded(self, request, pk):
        serializer_context = self.get_serializer_context()
        serializer_context['survey'] = pk
        queryset = Survey.objects.get(pk=pk)
        if queryset.user != request.user:
            msg = 'You are not the owner of this survey'
            raise serializers.ValidationError(msg)
        serializer = FullSurveySerializer(queryset, context=serializer_context)
        return Response(serializer.data)


class QuestionViewSet(ModelViewSet):
    http_method_names = ['get', 'patch', 'delete', 'head', 'option', 'post']
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):

        if self.request.method == 'PATCH':
            return {'request': self.request, 'survey': self.kwargs['survey_pk'], 'question': self.kwargs['pk']}

        return {'request': self.request, 'survey': self.kwargs['survey_pk']}

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.survey.user != request.user:
            msg = 'You are not the owner of this survey'
            raise serializers.ValidationError(msg)

        return super().destroy(request, *args, **kwargs)

    def get_queryset(self):

        survey_id = self.kwargs['survey_pk']
        return Question.objects.filter(survey=survey_id).prefetch_related('options')

    @action(detail=True, methods=['GET'], permission_classes=[IsAuthenticated])
    def get_votes(self, request, *args, **kwargs):
        survey_id = self.kwargs['survey_pk']
        survey = Survey.objects.get(pk=survey_id)

        if survey.user != request.user:
            msg = 'You are not the owner of this survey'
            raise serializers.ValidationError(msg)
        serializer_context = self.get_serializer_context()
        queryset = Option.objects.filter(question_id=self.kwargs['pk'])

        serializer = TotalViewSerialiser(
            queryset, many=True, context=serializer_context)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def extended(self, request, *args, **kwargs):
        survey_id = self.kwargs['survey_pk']
        survey = Survey.objects.get(pk=survey_id)

        if survey.user != request.user:
            msg = 'You are not the owner of this survey'
            raise serializers.ValidationError(msg)

        serializer_context = self.get_serializer_context()
        queryset = Question.objects.filter(survey=self.kwargs['survey_pk'])

        serializer = ExtendedQuestionSerializer(
            queryset, many=True, context=serializer_context)
        return Response(serializer.data)


class SurveyTakerViewSet(ModelViewSet):
    http_method_names = ['get', 'patch', 'head', 'option']
    queryset = User.objects.all()
    serializer_class = SurveyTakerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        if self.request.method == 'PATCH':
            return {'request': self.request, 'survey': self.kwargs['survey_pk'], 'user': self.kwargs['pk']}
        return {'request': self.request, 'survey': self.kwargs['survey_pk']}

    def get_queryset(self):

        survey_id = self.kwargs['survey_pk']
        survey_obj = Survey.objects.get(id=survey_id)

        if survey_obj.user == self.request.user:
            return User.objects.filter(vote__question__survey_id=survey_obj.id).distinct()
        msg = 'You are not the owner of this survey'
        raise serializers.ValidationError(msg)


class OptionViewSet(ModelViewSet):
    http_method_names = [
        'get',
        'patch',
        'delete',
        'head',
        'option',
        'post'
    ]
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        survey_id = self.kwargs['survey_pk']
        question_id = self.kwargs['question_pk']

        queryset = Option.objects.filter(
            question_id=question_id, question__survey_id=survey_id)
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.question.survey.user != request.user:
            raise serializers.ValidationError(
                'You are not the owner of this survey')

        return super().destroy(request, *args, **kwargs)

    def get_serializer_context(self):

        if self.request.method == 'PATCH':
            return {'request': self.request, 'survey': self.kwargs['survey_pk'], 'question': self.kwargs['question_pk'], 'option': self.kwargs['pk']}

        return {'request': self.request, 'survey': self.kwargs['survey_pk'], 'question': self.kwargs['question_pk']}


class EmailView(APIView):
    # Interaction.objects.all().delete()
    # now = timezone.now()

    # # Define the number of instances to create
    # num_instances = 600

    # # Define the duration in days for the instances to be created within
    # duration = 370

    # # Calculate the end date by adding the duration to the current date
    # end_date = now + timedelta(days=duration)

    # # Create instances with survey_1
    # for i in range(num_instances):
    #     # Calculate a random datetime within the range of now to end_date
    #     random_datetime = now + timedelta(days=random.randint(0, duration), hours=random.randint(
    #         0, 23), minutes=random.randint(0, 59), seconds=random.randint(0, 59))

    #     # Create an Interaction instance with the random datetime and survey_1
    #     interaction = Interaction.objects.create(
    #         started=random_datetime,
    #         completed=random_datetime + timedelta(minutes=random.randint(0, 25)),
    #         survey=Survey.objects.get(id=1),
    #         user=User.objects.get(id=1),
    #     )
    #     interaction.save()

    def post(self, request):
        print('Data', request.data)
        # Assuming the email address is sent as 'email' field in the request body
        email_address = request.data.get('recipiant')
        if email_address:
            try:
                # Validate the email address
                validate_email(email_address)
            except ValidationError as e:
                return Response({'error': str(e)}, status=400)

            # Send the email
            send_mail(
                'Subject of the Email',
                request.data.get('url'),
                'lucas.larking@gmail.com',
                [email_address],
                fail_silently=False,
            )
            return Response({'message': 'Email sent successfully'})
        else:
            return Response({'error': 'Email address not provided'}, status=400)


class MemberViewSet(ModelViewSet):

    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, permission_classes=[ViewMemberHistoryPermission])
    def history(self, request, pk):
        return Response('Ok')

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        member_obj = Member.objects.get(user_id=request.user.id)
        if request.method == 'GET':
            serializer = MemberSerializer(member_obj)
            print(member_obj)
            return Response(serializer.data)
        if request.method == 'PUT':
            serializer = MemberSerializer(member_obj, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class InteractionViewSet(ModelViewSet):
    serializer_class = InteractionSerializer
    http_method_names = ['get', 'delete', 'head', 'option', 'post']
    queryset = Interaction.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return InteractionSerializer

        return InteractionSerializer

    def get_serializer_context(self):
        print(self.request)
        if self.request.method == 'PATCH':
            return {'request': self.request, 'survey': self.kwargs['survey_pk'], 'interaction': self.kwargs['pk']}
        return {'request': self.request, 'survey': self.kwargs['survey_pk']}

    @action(detail=False, methods=['post'])
    def get_interaction(self, request, pk=None, survey_pk=None):
        serializer_context = self.get_serializer_context()
        serializer_context['user'] = request.data['id']
        survey_obj = Survey.objects.get(id=serializer_context['survey'])
        if survey_obj.user != request.user:
            msg = 'You are not the owner of this survey'
            raise serializers.ValidationError(msg)
        print(request.data, '#####')
        serializer = GetInteractionSerializer(
            data=request.data, context=serializer_context)
        serializer.is_valid(raise_exception=True)
        # serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def add_interaction_item(self, request, pk=None, survey_pk=None):
        serializer_context = self.get_serializer_context()
        serializer_context['interaction'] = pk
        print(serializer_context)
        serializer = InteractionItemSerializer(
            data=request.data, context=serializer_context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def get_interaction_items(self, request, pk=None, survey_pk=None):
        interaction = Interaction.objects.get(id=pk)
        if interaction.user != request.user:
            msg = 'You are not the owner of this survey'
            raise serializers.ValidationError(msg)
        serializer_context = self.get_serializer_context()
        serializer_context['interaction'] = pk

        objs = InteractionItem.objects.filter(interaction=int(pk))
        serializer = GetInteractionItemsSerializer(
            objs, many=True, context=serializer_context)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def submit_interaction(self, request, pk=None, survey_pk=None):
        serializer_context = self.get_serializer_context()
        serializer_context['interaction'] = pk

        interaction = Interaction.objects.get(id=pk)
        if interaction.user != request.user:
            msg = 'You are not the owner of this survey'
            return Response({'detail': msg}, status=status.HTTP_400_BAD_REQUEST)
        interactions = Interaction.objects.filter(
            user=request.user, survey=survey_pk)
        for obj in interactions:
            if obj.completed is not None:
                msg = 'You have already completed this survey'
                raise serializers.ValidationError(msg)

        if interaction.interactionItems.count() != interaction.survey.questions.count():
            msg = 'Please answer all questions'
            raise serializers.ValidationError(str(interaction.interactionItems.count(
            )) + '  ' + str(interaction.survey.questions.count()))

        serializer = InteractionSubmitSerializer(
            data=request.data, context=serializer_context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class FilterObjViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FilterObj.objects.all()
    http_method_names = ['get', 'options', 'post', 'head']
    serializer_class = FilterSerializer

    def get_queryset(self):
        survey_id = self.kwargs['survey_pk']
        queryset = FilterObj.objects.filter(survey=survey_id)
        return queryset

    def get_serializer_context(self):

        return {'request': self.request, 'survey': self.kwargs['survey_pk']}


    @action(detail=False, methods=['POST'], permission_classes=[IsAuthenticated])
    def clearFilter(self, request, survey_pk):

        if request.method == 'POST':
            survey_obj = Survey.objects.get(id=survey_pk)
            if survey_obj.user == request.user:
                vote_ojbs = Vote.objects.filter(question__survey=survey_obj)
                vote_ojbs.update(show=True)
                FilterObj.objects.filter(survey=survey_obj).delete()
                
                return Response(status=204)
            return Response(status=400)
