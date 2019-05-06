import json

from django.db import models


# Create your models here.
from django.utils.datetime_safe import datetime


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
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    due_on = models.DateTimeField(default=datetime.now, blank=True)
    status = models.CharField(max_length=256)
    task_list = models.ForeignKey(TaskList, models.CASCADE, related_name='tasks')

    def __str__(self):
        obj = {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'due_on': self.due_on,
            'status': self.status,
        }
        return str(obj)

    def to_json(self):
        obj = {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'due_on': self.due_on,
            'status': self.status,
        }
        return obj
