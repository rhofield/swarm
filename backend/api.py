from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from datetime import datetime
from backend.middleware.logic import chat_with_swarm
from backend.types import ChatResponse

@csrf_exempt
@require_http_methods(["POST"])
def send_message(request):
    try:
        data = json.loads(request.body)
        chat_history = data.get('history')
        if not chat_history or not isinstance(chat_history, list):
            return JsonResponse({'error': 'Missing or invalid chat history format'}, status=400)

        response : ChatResponse = chat_with_swarm(chat_history)
        return JsonResponse({'status': 'received', 'response': response['response'], 'agent': response['agent']})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON in request body'}, status=400)
    except Exception as e:
        # Log the error for debugging
        print(f"An error occurred: {e}") 
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)
