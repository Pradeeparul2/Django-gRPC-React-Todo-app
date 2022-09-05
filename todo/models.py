from django.db import models

# Create your models here.


class Todo(models.Model):
    task = models.CharField(max_length=250, blank=False, null=False)
    is_completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created"]
