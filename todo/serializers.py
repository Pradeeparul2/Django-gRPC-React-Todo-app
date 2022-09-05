from django_grpc_framework import proto_serializers
from .models import Todo
from . import todo_pb2


class TodoProtoSerializer(proto_serializers.ModelProtoSerializer):
    class Meta:
        model = Todo
        proto_class = todo_pb2.Todo
        fields = ["id", "task", "is_completed", "created"]
