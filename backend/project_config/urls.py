from django.urls import path
from backend.core_logic.api import send_message

urlpatterns = [
    path('api/send_message', send_message, name='send_message'),
] 