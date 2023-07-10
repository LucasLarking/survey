from django.urls import path, include

from rest_framework_nested import routers

from base.views import (
    QuestionViewSet,
    SurveyViewSet,
    OptionViewSet,

    EmailView,
    MemberViewSet,
    InteractionViewSet,
    FilterObjViewSet

    )
from .models import Survey


router = routers.DefaultRouter()
router.register('surveys', SurveyViewSet)

survey_router = routers.NestedDefaultRouter(router, 'surveys', lookup='survey')
survey_router.register('questions', QuestionViewSet, basename='survey-question')
survey_router.register('filterObjs', FilterObjViewSet, basename='survey-filterObjs')

survey_router.register('interactions', InteractionViewSet, basename='survey-interaction')


option_router = routers.NestedDefaultRouter(survey_router, 'questions', lookup='question')
option_router.register('options', OptionViewSet, basename='question-option')


router.register('members', MemberViewSet)



urlpatterns = [path('send-email/', EmailView.as_view(), name='send-email'),] + router.urls + survey_router.urls + option_router.urls 