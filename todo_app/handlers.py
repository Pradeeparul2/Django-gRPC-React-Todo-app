from todo.services import TodoService
from todo.proto import todo_pb2_grpc


def grpc_handlers(server):
    todo_pb2_grpc.add_TodoControllerServicer_to_server(
        TodoService.as_servicer(), server
    )
