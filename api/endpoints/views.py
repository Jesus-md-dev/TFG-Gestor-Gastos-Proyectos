from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from endpoints.models import User, Project, expense, ip_project
from django.core.serializers import serialize

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
