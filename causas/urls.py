from django.urls import path
from . import views

app_name = 'causas'

urlpatterns = [
    path('', views.causas),
    path('causas/', views.causas),
    path('causa/<int:causa_id>', views.causa_detail),
    path('eventos/', views.eventos),
    path('causa/<int:causa_id>/eventos/', views.eventos_por_causa),
    path('eventos/<int:evento_id>', views.evento_detail),
    path("api/signup/", views.signup),
    path("api/login/", views.login_view, name="login"),
]