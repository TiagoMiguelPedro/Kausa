from django.shortcuts import render
from .serializers import *
from .models import Causa, Evento, Participante, CausaVoto, Comentario, LikeComentario
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from rest_framework.permissions import AllowAny


def is_admin(user):
    return user.is_staff or user.is_superuser


@api_view(["GET"])
def user_view(request):
    if request.user.is_authenticated:
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "is_admin": is_admin(request.user),
        })

    return Response({
        "id": None,
        "username": None,
        "is_admin": False,
    })


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
    if not request.user.is_authenticated:
        return Response(
            {"msg": "Tem de estar autenticado."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        causa = Causa.objects.get(pk=causa_id)
    except Causa.DoesNotExist:
        return Response(
            {"msg": "Causa não encontrada."},
            status=status.HTTP_404_NOT_FOUND
        )

    user_is_admin = is_admin(request.user)
    user_is_responsavel = causa.causa_responsavel == request.user

    if request.method == 'PUT':

        if not user_is_admin:
            if not user_is_responsavel:
                return Response(
                    {"msg": "Não tem permissão para editar esta causa."},
                    status=status.HTTP_403_FORBIDDEN
                )

            if causa.causa_estado != 0:
                return Response(
                    {"msg": "Só o administrador pode editar uma causa ativa ou concluída."},
                    status=status.HTTP_403_FORBIDDEN
                )

        serializer = CausaSerializer(causa, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':

        if not user_is_admin:
            return Response(
                {"msg": "Só o administrador pode eliminar causas."},
                status=status.HTTP_403_FORBIDDEN
            )

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

        if not request.user.is_authenticated:
            return Response(
                {"msg": "Tem de estar autenticado para criar um evento."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        causa_id = request.data.get("evento_causa")

        try:
            causa = Causa.objects.get(pk=causa_id)
        except Causa.DoesNotExist:
            return Response(
                {"msg": "Causa não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        user_is_admin = is_admin(request.user)
        user_is_responsavel = causa.causa_responsavel == request.user

        if not user_is_admin and not user_is_responsavel:
            return Response(
                {"msg": "Só o responsável da causa ou um administrador pode criar eventos para esta causa."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(evento_criador=request.user)
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
    if not request.user.is_authenticated:
        return Response(
            {"msg": "Tem de estar autenticado."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        evento = Evento.objects.get(pk=evento_id)
    except Evento.DoesNotExist:
        return Response(
            {"msg": "Evento não encontrado."},
            status=status.HTTP_404_NOT_FOUND
        )
    user_is_admin = is_admin(request.user)
    user_is_criador = evento.evento_criador == request.user
    user_is_responsavel_causa = evento.evento_causa.causa_responsavel == request.user

    if request.method == 'PUT':
        if not user_is_admin and not user_is_criador and not user_is_responsavel_causa:
            return Response(
                {"msg": "Não tem permissão para editar este evento."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EventoSerializer(evento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':

        if user_is_admin:
            evento.delete()
            return Response({"msg": "Evento eliminado com sucesso."}, status=status.HTTP_204_NO_CONTENT)

        if not user_is_criador:
            return Response(
                {"msg": "Só pode eliminar eventos criados por si."},
                status=status.HTTP_403_FORBIDDEN
            )

        if evento.participante_set.exists():
            return Response(
                {"msg": "Não pode eliminar este evento porque já tem participantes inscritos."},
                status=status.HTTP_403_FORBIDDEN
            )

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


# Votos Causas----------------------------------

LIMITE_VOTOS_CAUSA = 5


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def votar_causa(request, causa_id):
    try:
        causa = Causa.objects.get(id=causa_id)
    except Causa.DoesNotExist:
        return Response(
            {"erro": "Causa não encontrada."},
            status=status.HTTP_404_NOT_FOUND
        )

    if causa.causa_estado != 0:
        return Response(
            {"erro": "Só é possível votar em causas em votação."},
            status=status.HTTP_400_BAD_REQUEST
        )

    voto = CausaVoto.objects.filter(
        causaVoto_causa=causa,
        causaVoto_user=request.user
    ).first()

    # REMOVER VOTO
    if voto:
        voto.delete()

        causa.causa_nrVotos -= 1

        if causa.causa_nrVotos < 0:
            causa.causa_nrVotos = 0

        causa.save()

        return Response({
            "votado": False,
            "causa_nrVotos": causa.causa_nrVotos,
            "causa_estado": causa.causa_estado
        })

    # ADICIONAR VOTO
    CausaVoto.objects.create(
        causaVoto_causa=causa,
        causaVoto_user=request.user
    )

    causa.causa_nrVotos += 1

    LIMITE_VOTOS_CAUSA = 5

    if causa.causa_nrVotos >= LIMITE_VOTOS_CAUSA:
        causa.causa_estado = 1

    causa.save()

    return Response({
        "votado": True,
        "causa_nrVotos": causa.causa_nrVotos,
        "causa_estado": causa.causa_estado
    })
