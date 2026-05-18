from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import Causa, Evento, Participante, CausaVoto, Comentario, LikeComentario

@api_view(['GET', 'POST'])
def causas(request):

    if request.method == 'GET':
        lista_causas = Causa.objects.all()
        serializer = CausaSerializer(lista_causas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CausaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
def eventos(request, causa_id):

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
        lista_participantes = evento.participantes_set.all()
        serializer = ParticipanteSerializer(lista_participantes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ParticipanteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



