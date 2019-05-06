from django.urls import path

from api2 import views

urlpatterns = [
    # path('task_lists/', views.task_lists, name='task_lists'),
    # path('task_lists/<int:id>/', views.task_lists_with_id, name='task_lists_with_id'),
    # path('task_lists/<int:id>/tasks/', views.tasks_of_tasklist_with_id, name='tasks_of_tasklist_with_id'),
    # path('tasks/<int:id>/', views.task, name='task'),
    path('login/', views.login),
    path('logout/', views.logout),
    path('task_lists/', views.TaskListsApi.as_view(), name='task_lists'),
    path('task_lists/<int:pk>/', views.TaskListApi.as_view(), name='task_lists_with_id'),
    path('task_lists/<int:pk>/tasks/', views.TasksOfTaskListApi.as_view(), name='tasks_of_tasklist_with_id'),
    path('tasks/<int:pk>/', views.taskFun, name='task'),

]
