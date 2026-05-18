from rest_framework import serializers
from .models import Causa, Evento, Participante, CausaVoto, Comentario, LikeComentario

class CausaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Causa
        fields = ('id', 'causa_responsavel', 'causa_nome', 'causa_descricao', 'causa_nrVotos', 'causa_estado')

class EventoSerializer(serializers.ModelSerializer):
    evento_dataHora = serializers.DateTimeField(read_only=True, required=False)
    class Meta:
        model = Evento
        fields = ('id', 'evento_causa', 'evento_nome', 'evento_descricao', 'evento_localizacao', 'evento_dataHora', 'evento_limiteParticipantes', 'evento_lotado', 'evento_ativo')

class ParticipanteSerializer(serializers.ModelSerializer):
    participante_dataInscricao = serializers.DateTimeField(read_only=True, required=False)
    class Meta:
        model = Participante
        fields = ('id', 'participante_evento', 'participante_user', 'participante_dataInscricao')

class CausaVotoSerializer(serializers.ModelSerializer):
    causaVoto_dataVoto = serializers.DateTimeField(read_only=True, required=False)
    class Meta:
        model = CausaVoto
        fields = ('id', 'causaVoto_causa', 'causaVoto_user', 'causaVoto_dataVoto')

class ComentarioSerializer(serializers.ModelSerializer):
    comentario_dataComentario = serializers.DateTimeField(read_only=True, required=False)
    class Meta:
        model = Comentario
        fields= ('id', 'comentario_causa', 'comentario_user', 'comentario_evento', 'comentario_texto', 'comentario_dataComentario')

class LikeComentarioSerializer(serializers.ModelSerializer):
    likeComentario_dataLike = serializers.DateTimeField(read_only=True, required=False)
    class Meta:
        model = LikeComentario
        fields= ('id', 'likeComentario_comentario', 'likeComentario_user', 'likeComentario_dataLike')