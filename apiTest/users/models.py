from asyncio.windows_events import NULL
from django.db import models
from django.contrib.auth.models import User

class Project (models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.URLField(default=NULL)


class Expense (models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dossier = models.CharField(max_length=100)
    date = models.DateTimeField()
    concept = models.CharField(max_length=100)
    amount = models.DecimalField(decimal_places=10, max_digits=10)
    vatpercentage = models.IntegerField()
    final_amount = models.DecimalField(decimal_places=10, max_digits=10)


class ip_project (models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)