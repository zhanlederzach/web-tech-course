from django.contrib import admin

# Register your models here.
from api2.models import TaskList, Task

admin.site.register(TaskList)
admin.site.register(Task)
