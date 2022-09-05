from django.urls import path
from . import views

urlpatterns = [
    path("api/add_task", views.add_task, name="add_task"),
    path("api/list_task", views.list_task, name="list_task"),
    path("api/task/<int:id>", views.get_task, name="task"),
    path("api/update_task", views.update_task, name="update_task"),
    path("api/delete_task/<int:id>", views.delete_task, name="delete_task"),
    path("", views.index, name="index"),
]
