import grpc
from django_grpc_framework.services import Service
from google.protobuf import empty_pb2
from .models import Todo
from .serializers import TodoProtoSerializer


class TodoService(Service):
    def List(self, request, context):
        todos = Todo.objects.all()
        serializer = TodoProtoSerializer(todos, many=True)
        for msg in serializer.message:
            yield msg

    def Create(self, request, context):
        serializer = TodoProtoSerializer(message=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.message

    def get_object(self, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            return self.context.abort(
                grpc.StatusCode.NOT_FOUND, "Task:%s not found!" % pk
            )

    def Retrieve(self, request, context):
        task = self.get_object(request.id)
        serializer = TodoProtoSerializer(task)
        return serializer.message

    def Update(self, request, context):
        task = self.get_object(request.id)
        serializer = TodoProtoSerializer(task, message=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.message

    def Destroy(self, request, context):
        task = self.get_object(request.id)
        task.delete()
        return empty_pb2.Empty()
