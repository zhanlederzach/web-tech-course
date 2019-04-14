import json

from django.db import models


# Create your models here.

class TaskList(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        obj = {
            'id': self.id,
            'name': self.name
        }
        return json.dumps(obj)

    def to_json(self):
        obj = {
            'id': self.id,
            'name': self.name
        }
        return obj


class Task(models.Model):
    name = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now=True)
    due_on = models.DateTimeField()
    status = models.CharField(max_length=256)
    task_list = models.ForeignKey(TaskList, models.CASCADE)

    def __str__(self):
        obj = {
            'id': self.id,
            'name': self.name,
            'status': self.status
        }
        return json.dumps(obj)

    def to_json(self):
        obj = {
            'id': self.id,
            'name': self.name,
            'status': self.status
        }
        return obj
