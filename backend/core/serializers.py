from djoser.serializers import UserCreateSerializer as BaseUserCreateCreateSerialzser
from djoser.serializers import UserSerializer as BaseUserSerialzser
from rest_framework import serializers


class UserCreateSerializer(BaseUserCreateCreateSerialzser):
    class Meta(BaseUserCreateCreateSerialzser.Meta):
        fields = [
            'id',
            'username',
            'password',
            'email',
            'first_name',
            'last_name'
        ]


class UserSerializser(BaseUserSerialzser):
    class Meta(BaseUserSerialzser.Meta):
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
