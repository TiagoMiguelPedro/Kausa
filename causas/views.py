from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import Causa, Evento, Participante, CausaVoto, Comentario, LikeComentario
from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from rest_framework.permissions import AllowAny

@api_view(['GET', 'POST'])
def causas(request):
    if request.method == 'GET':
        lista_causas = Causa.objects.all()
        serializer = CausaSerializer(lista_causas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        if not request.user.is_authenticated:
            return Response(
                {"msg": "Tem de estar autenticado para criar uma causa"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = CausaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(causa_responsavel=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def causa_detail(request, causa_id):

    try:
        causa = Causa.objects.get(pk=causa_id)
    except Causa.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CausaSerializer(causa, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        causa.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def eventos(request):

    if request.method == 'GET':
        lista_eventos = Evento.objects.all()
        serializer = EventoSerializer(lista_eventos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def eventos_por_causa(request, causa_id):

    if request.method == 'GET':
        causa = Causa.objects.get(pk=causa_id)
        lista_eventos = causa.evento_set.all()
        serializer = EventoSerializer(lista_eventos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def evento_detail(request, evento_id):

    try:
        evento = Evento.objects.get(pk=evento_id)
    except Evento.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = EventoSerializer(evento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        evento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def participantes(request, evento_id):

    if request.method == 'GET':
        evento = Evento.objects.get(pk=evento_id)
        lista_participantes = evento.participante_set.all()
        serializer = ParticipanteSerializer(lista_participantes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ParticipanteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def signup(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")

    if not username or not password:
        return Response(
            {"msg": "Username e password são obrigatórios."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"msg": "Esse username já existe."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    return Response(
        {"msg": "Utilizador criado com sucesso."},
        status=status.HTTP_201_CREATED
    )


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def login_view(request):

    username = request.data.get("username", "").strip()
    password = request.data.get("password", "").strip()

    print("USERNAME:", repr(username))
    print("PASSWORD:", repr(password))

    user = authenticate(
        request,
        username=username,
        password=password
    )

    print("AUTH:", user)

    if user is None:
        return Response(
            {"msg": "Credenciais inválidas"},
            status=status.HTTP_400_BAD_REQUEST
        )

    login(request, user)

    return Response({
        "msg": "Login com sucesso",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
    })


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({"msg": "Logout com sucesso"})
