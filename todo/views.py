import grpc
from . import todo_pb2
from .proto import todo_pb2_grpc
from django.views.decorators.csrf import csrf_exempt
from google.protobuf.json_format import MessageToDict
from .serializers import TodoProtoSerializer
from django.http import JsonResponse
from django.shortcuts import render


def create_client():
    # Create a connection with the server
    channel = grpc.insecure_channel("localhost:50051")
    stub = todo_pb2_grpc.TodoControllerStub(channel)
    return stub


@csrf_exempt
def add_task(request):
    client_stub = create_client()
    if request.method == "POST":
        data = request.POST
        client_stub.Create(todo_pb2.Todo(task=data.get("task")))
    return JsonResponse({})


def list_task(request):
    client_stub = create_client()
    all_task = client_stub.List(todo_pb2.TodoListRequest())
    serializer = TodoProtoSerializer(all_task, many=True)
    response = [MessageToDict(msg) for msg in serializer.message]
    return JsonResponse(response, safe=False)


def get_task(request, id):
    client_stub = create_client()
    try:
        task = client_stub.Retrieve(todo_pb2.TodoRetrieveRequest(id=id))
        res = MessageToDict(task)
    except grpc._channel._InactiveRpcError:
        res = {"status": f"Task {id} not found"}
    return JsonResponse(res)


@csrf_exempt
def update_task(request):
    client_stub = create_client()
    if request.method == "POST":
        data = request.POST
        id = data.get("id")
        task = data.get("task")
        status = data.get("status")
        task = client_stub.Update(
            todo_pb2.Todo(id=int(id), task=task, is_completed=bool(status))
        )
        return JsonResponse(MessageToDict(task))


@csrf_exempt
def delete_task(request, id):
    client_stub = create_client()
    task = client_stub.Destroy(todo_pb2.Todo(id=id))
    return JsonResponse({})


def index(request):
    context = {}
    return render(request, "index.html", context)
