from django.contrib.auth.models import User
from rest_framework import serializers

from api2.models import TaskList, Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


# class TaskListSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(required=True)
#
#     def create(self, validated_data):
#         task_list = TaskList(**validated_data)
#         task_list.save()
#         return task_list
#
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.save()
#         return instance


class TaskListSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()

    class Meta:
        model = TaskList
        fields = ('id', 'name',)

    # def create(self, validated_data):
    #     tasks_data = validated_data.pop('tasks')
    #     task_list = TaskList.objects.create(**validated_data)
    #     for task_data in tasks_data:
    #         Task.objects.create(task_list=task_list, **task_data)
    #     return task_list


class TaskSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    created_at = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", required=False)
    due_on = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", required=False)
    status = serializers.CharField()

    class Meta:
        model = Task
        fields = ('id', 'name', 'created_at', 'due_on', 'status')

    # def create(self, validated_data):
    #     task = Task(**validated_data)
    #     task.save()
    #     return task
    #
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.status = validated_data.get('status', instance.status)
    #     instance.created_at = validated_data.get('created_at', instance.created_at)
    #     instance.due_on = validated_data.get('due_on', instance.due_on)
    #
    #     instance.save()
    #     return instance
    #
    # def create(self, validated_data):
    #     task_list_data = validated_data.pop('task_list')
    #     task_list = TaskList.objects.create(**task_list_data)
    #     task = Task.objects.create(task_list=task_list, **validated_data)
    #     return task
