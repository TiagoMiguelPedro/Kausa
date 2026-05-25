from rest_framework import serializers
from .models import Causa, Evento, Participante, CausaVoto, Comentario, LikeComentario


class CausaSerializer(serializers.ModelSerializer):
    causa_responsavel_nome = serializers.CharField(
        source='causa_responsavel.username',
        read_only=True
    )
    votado = serializers.SerializerMethodField()

    class Meta:
        model = Causa
        fields = (
            'id',
            'causa_responsavel',
            'causa_responsavel_nome',
            'causa_nome',
            'causa_descricao',
            'causa_nrVotos',
            'causa_estado',
            'votado'
        )
        read_only_fields = ('causa_responsavel',)

    def get_votado(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return CausaVoto.objects.filter(
                causaVoto_causa=obj,
                causaVoto_user=request.user
            ).exists()

        return False


class EventoSerializer(serializers.ModelSerializer):
    causa_nome = serializers.CharField(source='evento_causa.causa_nome', read_only=True)
    evento_criador_nome = serializers.CharField(source='evento_criador.username', read_only=True)
    numero_participantes = serializers.SerializerMethodField()

    class Meta:
        model = Evento
        fields = ('id', 'evento_causa', 'causa_nome', 'evento_criador', 'evento_criador_nome', 'evento_nome',
                  'evento_descricao', 'evento_localizacao', 'evento_dataHora', 'evento_limiteParticipantes',
                  'evento_lotado', 'evento_ativo', 'numero_participantes',)
        read_only_fields = ('evento_criador',)

    def get_numero_participantes(self, obj):
        return obj.participante_set.count()


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
        fields = ('id', 'comentario_causa', 'comentario_user', 'comentario_evento', 'comentario_texto',
                  'comentario_dataComentario')


class LikeComentarioSerializer(serializers.ModelSerializer):
    likeComentario_dataLike = serializers.DateTimeField(read_only=True, required=False)

    class Meta:
        model = LikeComentario
        fields = ('id', 'likeComentario_comentario', 'likeComentario_user', 'likeComentario_dataLike')
