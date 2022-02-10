from atexit import register
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from endpoints.models import User, Project, Expense, ip_project
from django.core.serializers import serialize
from django.urls import path
import datetime

def create_user(request, username, password, name, surname, email):
    try:
        user = User(username=username, password=password, name=name,
            surname=surname, email=email)
        user.save()
        return HttpResponse(serialize('json', [user]))
    except:
        return HttpResponse("Creation Failure")


def create_project(request, name, category, username):
    try:
        user = User.objects.get(username__exact=username)
        project = Project(name=name, category=category, admin=user)
        project.save()
        return HttpResponse(serialize('json', [project]))
    except User.DoesNotExist:
        return HttpResponse("User Does Not Exist")


def delete_user(request, username):
    try:
        user = User.objects.get(username__exact=username)
        user.delete()
        return HttpResponse("User " + username + " deleted", )
    except User.DoesNotExist:
        return HttpResponse("User Does Not Exist")
    except:
        return HttpResponse("Delete Failure")


def delete_project(request, id):
    try:
        project = Project.objects.get(pk=id)
        name = project.name
        project.delete()
        return HttpResponse("Project " + str(id) + " " + name + " deleted", )
    except Project.DoesNotExist:
        return HttpResponse("Project Does Not Exist")


def get_all_user(request):
    try:
        users = User.objects.all()
        return HttpResponse(serialize('json', users))
    except:
        return HttpResponse("Get All Users error")


def get_all_project(request):
    try:
        projects = Project.objects.all()
        return HttpResponse(serialize('json', projects))
    except:
        return HttpResponse("Get All Users error")


def get_user(request, username):
    try:
        user = User.objects.get(username__exact=username)
        return HttpResponse(serialize('json', [user]))
    except User.DoesNotExist:
        return HttpResponse("User Does Not Exist")


def get_user_projects(request, username):
    try:
        user = User.objects.get(username__exact=username)
        proyect = Project.objects.get(admin__exact=user)
        return HttpResponse(serialize('json', [proyect]))
    except User.DoesNotExist:
        return HttpResponse("User Does Not Exist")
    except Project.MultipleObjectsReturned:
        proyects = Project.objects.filter(admin__exact=user)
        return HttpResponse(serialize('json', proyects))


def create_expense(request, project_id, username, dossier, year, month, day, hour, 
    minutes, concept, amount, vatpercentage):
    try:
        user = User.objects.get(username__exact=username)
        project = Project.objects.get(pk=project_id)
        dt = datetime.datetime(year, month, day, hour, minutes)
        expense = Expense(project=project, user=user, dossier=dossier, date=dt,
            concept=concept, amount=amount, vatpercentage=vatpercentage,
            final_amount=amount + amount * vatpercentage / 100)
        expense.save()
        return HttpResponse(serialize('json', [expense]))
    except User.DoesNotExist:
        return HttpResponse("User Does Not Exist")
    except Project.DoesNotExist:
        return HttpResponse("Project Does Not Exist")


def get_all_expense(request):
    expenses = Expense.objects.all()
    return HttpResponse(serialize('json', expenses))


def get_project_expenses(request, project_id):
    try:
        project = Project.objects.get(pk=project_id)
        expense = Expense.objects.get(project=project)
        return HttpResponse(serialize('json', [expense]))
    except Project.DoesNotExist:
        return HttpResponse("Project Does Not Exist")
    except Expense.MultipleObjectsReturned:
        expenses = Expense.objects.filter(project=project)
        return HttpResponse(serialize('json', expenses))


def delete_expense(request, id):
    try:
        expese = Expense.objects.get(pk=id)
        concept = expese.concept
        expese.delete()
        return HttpResponse("Project " + str(id) + " " + concept + " deleted", )
    except Expense.DoesNotExist:
        return HttpResponse("Concept Does Not Exist")