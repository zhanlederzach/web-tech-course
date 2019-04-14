import json

from django.http import HttpResponse, JsonResponse

# Create your views here.
from api.models import TaskList, Task


def hello(request):
    return HttpResponse('hello')


def task_lists(request):
    try:
        return JsonResponse([x.to_json() for x in TaskList.objects.all()], safe=False)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)


def task_lists_with_id(request, id):
    try:
        return JsonResponse(TaskList.objects.get(id=id).to_json(), safe=False)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)


def tasks_of_tasklist_with_id(request, id):
    try:
        tasklist = TaskList.objects.get(id=id)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)
    tasks_set = tasklist.task_set
    tasks = tasks_set.all()
    response = [x.to_json() for x in tasks]
    return JsonResponse(response, safe=False)


def task(request, id):
    try:
        return JsonResponse(Task.objects.get(id=id).to_json(), safe=False)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)
