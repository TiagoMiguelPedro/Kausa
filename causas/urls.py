from django.urls import path
from . import views

app_name = 'causas'

urlpatterns = [
    path('', views.causas),
    path('causas/', views.causas),
    path('causa/<int:causa_id>', views.causa_detail),
    path('eventos/<int:causa_id>', views.eventos),
    path('eventos/<int:evento_id>', views.evento_detail),
    path('eventos/<int:evento_id>/participantes', views.participantes),

]
