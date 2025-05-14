from django.urls import path
from . import api

urlpatterns = [
    # Map both paths to the get_response view for now.
    # Note: get_response expects POST, so GET requests to /api/messages/ might fail.
    path('api/send_message', api.send_message, name='send_message'),
] 