from sqlite3 import adapt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializers import RegisterSerializer
from django.http import HttpResponse
from users.models import Project, Expense, ip_project
from django.core.serializers import serialize
from django.contrib.auth.models import User
import datetime


@api_view(['POST'])
def login_api(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    _, token = AuthToken.objects.create(user)

    return Response({
        'user_info': {
            'id':user.id,
            'username': user.username,
            'email': user.email,
        },
        'token': token,
    })


@api_view(['GET'])
def get_user_data(request):
    user = request.user
    if user.is_authenticated:
        return Response({
            'user_info': {
            'id':user.id,
            'username': user.username,
            'email': user.email,
            },
        })
        
    return Response({'error': 'not authenticated'}, status=400)


@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    _, token = AuthToken.objects.create(user)

    return Response({
        'user_info': {
            'id':user.id,
            'username': user.username,
            'email': user.email,
        },
        'token': token,
    })

@api_view(['POST'])
def create_project(request):
    user = request.user
    if user.is_authenticated:
        try:
            project = Project(name=request.data.get('name'), 
                category=request.data.get('category'), admin=user, img=request.data.get('img'))
            project.save()
            return Response({
                'project_info': {
                    'id': project.id,
                    'name': project.name,
                    'category': project.category,
                    'admin': user.username
                },
            })
        except:
            return Response({'error': 'error in project parameters'})
    else:
        return Response({'error': 'not authenticated'}, status=400)
        

@api_view(['DELETE'])
def delete_project(request):
    user = request.user
    if user.is_authenticated:
        try:
            id = request.data.get('project_id')
            project = Project.objects.get(pk=id)
            print({
                'user': user,
                'project':  project.admin,
            })
            if user == project.admin:
                name = project.name
                project.delete()
                return Response({"project_info": "project " + name + " deleted"})
            else:
                return Response({'error': 'user is not owner'}, status=400)
        except Project.DoesNotExist:
            return Response({'error': 'project does not exist'}, status=400)
    else:
        return Response({'error': 'not authenticated'}, status=400)


def get_all_project(request):
    try:
        projects = Project.objects.all()
        return HttpResponse(serialize('json', projects))
    except:
        return HttpResponse("Get All Users error")


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
    except Expense.DoesNotExist:
        return HttpResponse("Expense Does Not Exist")
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