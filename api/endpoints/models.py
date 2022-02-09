from unicodedata import category
from django.db import models
import json

class User (models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=100)
    email = models.EmailField(max_length=70)


class Project (models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)


class expense (models.Model):
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


