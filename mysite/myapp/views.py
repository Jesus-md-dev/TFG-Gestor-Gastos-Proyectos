from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from myapp.models import Data

def index(request):
    d = Data.objects.all().values()
    return HttpResponse(d)


def insert(request, name):
    d = Data(name=name)
    d.save()
    return HttpResponse(str(d) + " created")


def select_name(request, name):
    try:
        d = Data.objects.get(name__contains=name)
    except Data.DoesNotExist:
        return HttpResponse(name + " does not exist")
    except Data.MultipleObjectsReturned:
        return HttpResponse(Data.objects.filter(name__contains=name))
    return HttpResponse(d.id)


def delete_name(request, name):
    try:
        d = Data.objects.get(name__exact=name)
    except Data.DoesNotExist:
        return HttpResponse(name + " does not exist")
    d.delete()
    return HttpResponse("Data deleted")


def delete_all(request):
    d = Data.objects.all()
    d.delete()
    return HttpResponse("Data table deleted")
