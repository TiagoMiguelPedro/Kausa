from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime

class Causa(models.Model):
    causa_responsavel = models.ForeignKey(User, on_delete=models.CASCADE)
    causa_nome = models.CharField(max_length=100)
    causa_descricao = models.TextField()
    causa_nrVotos = models.IntegerField(default=0)
    causa_estado = models.IntegerField(default=0)

    def __str__(self):
        return self.causa_nome


class Evento(models.Model):
    evento_causa = models.ForeignKey(Causa, on_delete=models.CASCADE)
    evento_nome = models.CharField(max_length=100)
    evento_descricao = models.TextField()
    evento_localizacao = models.TextField()
    evento_dataHora = models.DateTimeField(default=timezone.now)
    evento_limiteParticipantes = models.IntegerField(default=0)
    evento_lotado = models.BooleanField(default=False)
    evento_ativo = models.BooleanField(default=False)

    def __str__(self):
        return self.evento_nome

    def publicado_recentemente(self):
        return self.evento_dataHora >= timezone.now() -datetime.timedelta(days=1)


class Participante(models.Model):
    participante_evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    participante_user = models.ForeignKey(User, on_delete=models.CASCADE)
    participante_dataInscricao = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.participante_user


class CausaVoto(models.Model):
    causaVoto_causa = models.ForeignKey(Causa, on_delete=models.CASCADE)
    causaVoto_user = models.ForeignKey(User, on_delete=models.CASCADE)
    causaVoto_dataVoto = models.DateTimeField(default=timezone.now)



class Comentario(models.Model):
    comentario_causa = models.ForeignKey(Causa, on_delete=models.CASCADE)
    comentario_user = models.ForeignKey(User, on_delete=models.CASCADE)
    comentario_evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    comentario_texto = models.TextField()
    comentario_dataComentario = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.comentario_texto


class LikeComentario(models.Model):
    likeComentario_user = models.ForeignKey(User, on_delete=models.CASCADE)
    likeComentario_comentario = models.ForeignKey(Comentario, on_delete=models.CASCADE)
    likeComentario_dataLike = models.DateTimeField(default=timezone.now)
