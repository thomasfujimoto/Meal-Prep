from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

@csrf_exempt
@require_http_methods(["POST"])
def receive_intls(request):
    if request.method == "POST":
        data = json.loads(request.body)
        received_data = data.get("example_data", None)

        # Example processing: Check if data is received and perform some action
        if received_data:
            processed_data = "Data successfully received and processed."
        else:
            processed_data = "No data received."

        # Example response data
        response_data = {"processed_data": processed_data}

        # Return JSON response
        return JsonResponse(response_data)

@csrf_exempt
@require_http_methods(["POST"])
def receive_strls(request):
    if request.method == "POST":
        data = json.loads(request.body)
        received_data = data.get("example_data", None)

        # Example processing: Check if data is received and perform some action
        if received_data:
            processed_data = "Data successfully received and processed."
        else:
            processed_data = "No data received."

        # Example response data
        response_data = {"processed_data": processed_data}

        # Return JSON response
        return JsonResponse(response_data)

@csrf_exempt
@require_http_methods(["POST"])
def receive_str(request):
    if request.method == "POST":
        data = json.loads(request.body)
        received_data = data.get("example_data", None)

        # Example processing: Check if data is received and perform some action
        if received_data:
            processed_data = "Data successfully received and processed."
        else:
            processed_data = "No data received."

        # Example response data
        response_data = {"processed_data": processed_data}

        # Return JSON response
        return JsonResponse(response_data)

@csrf_exempt
@require_http_methods(["POST"])
def send_data_to_frontend(request):
    if request.method == "POST":
        data = json.loads(request.body)
        received_data = data.get("example_data", None)

        # Example processing: Check if data is received and perform some action
        if received_data:
            processed_data = "Data successfully received and processed."
        else:
            processed_data = "No data received."

        # Example response data
        response_data = {"processed_data": processed_data}

        # Return JSON response
        return JsonResponse(response_data)
