from django.http import Http404
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from api2.models import TaskList
from api2.serializers import TaskListSerializer2, TaskSerializer2


# class TaskListsApi(APIView):
#     def get(self, request):
#         task_lists = TaskList.objects.all()
#         serializer = TaskListSerializer2(task_lists, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = TaskListSerializer2(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TaskListsApi(generics.ListCreateAPIView):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer2


class TaskListApi(APIView):
    def get_object(self, pk):
        try:
            return TaskList.objects.get(pk=pk)
        except TaskList.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        task_list = self.get_object(pk)
        serializer = TaskListSerializer2(task_list)
        return Response(serializer.data)

    def put(self, request, pk):
        task_list = self.get_object(pk)
        serializer = TaskListSerializer2(instance=task_list, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        task_list = self.get_object(pk)
        task_list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TasksOfTaskListApi(APIView):
    def get_object(self, pk):
        try:
            return TaskList.objects.get(pk=pk)
        except TaskList.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        tasks = self.get_object(pk).tasks.all()
        serializer = TaskSerializer2(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        serializer = TaskSerializer2(data=request.data)

        if serializer.is_valid(raise_exception=True):
            task = serializer.save(task_list=TaskList.objects.get(pk=pk))
            task.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
