import json
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from .serializers import RegisterSerializer
from users.models import Project, Expense, ProjectMember
from django.core.serializers import serialize
from django.contrib.auth.models import User


#MUST DELETE ENDPOINTS
@api_view(['GET'])
def clear_users(request):
    users = User.objects.all()
    for user in users:
        if not (user.is_superuser or user.is_superuser):
            user.delete()
    return Response({'message': 'clear'})

#https://changsin.medium.com/how-to-serialize-a-class-object-to-json-in-python-849697a0cd3
#ADMIN ENDPOINTS
@api_view(['GET'])
def is_token_available(request):
    user = request.user
    if user.is_authenticated:
        return Response({'message': 'token available'})
    else: 
        return Response({'error': 'not authenticated'}, status=404)

        
@api_view(['GET'])
def is_alive(request):
    return Response({'message': 'available'})


@api_view(['GET'])
def get_all_users(request):
    try:
        user = request.user
        if user.is_authenticated:
            if user.is_superuser:
                user_list = []
                users = User.objects.all()
                for user in users:
                    user_dict = {}
                    user_dict['id'] = user.id
                    user_dict['username'] = user.username
                    user_dict['email'] = user.email
                    user_dict['first_name'] = user.first_name
                    user_dict['last_name'] = user.last_name
                    user_dict['is_superuser'] = user.is_superuser
                    user_dict['is_staff'] = user.is_staff
                    user_dict['is_active'] = user.is_active
                    user_dict['date_joined'] = user.date_joined
                    user_dict['img'] = user.profile.img
                    user_list.append(user_dict)
                user_list = list(user_list)
                return JsonResponse(user_list, safe=False)
            else:
                return Response({'error': 'not allowed'}, status=405)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['GET'])
def get_all_project(request):
        user = request.user
        if user.is_authenticated:
            if user.is_superuser:
                projects = Project.objects.all()
                projects = [project.as_json() for project in projects]
                return HttpResponse(json.dumps(projects))
            else:
                return Response({'error': 'not allowed'}, status=405)
        else: 
            return Response({'error': 'not authenticated'}, status=404)


@api_view(['GET'])
def get_all_expenses(request):
        user = request.user
        if user.is_authenticated:
            if user.is_superuser:
                expenses = Expense.objects.all()
                expenses = [expense.as_json() for expense in expenses]
                return HttpResponse(json.dumps(expenses))
            else:
                return Response({'error': 'not allowed'}, status=405)
        else: 
            return Response({'error': 'not authenticated'}, status=404)


#USER ENDPOINTS
@api_view(['POST'])
def create_user(request):
    try: 
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.profile.img = request.data.get('img')
        user.save()
        _, token = AuthToken.objects.create(user)

        return Response({
            'user_info': {
                'id':user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'img': user.profile.img
            },
            'token': token,
        })
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['GET'])
def read_user(request, username):
    try:
        user = request.user
        user_requested = User.objects.get(username=username)
        if user.is_authenticated:
            if user.is_superuser or user.id == user_requested.id:
                return Response({
                    'user_info': {
                        'id':user_requested.id,
                        'username': user_requested.username,
                        'email': user_requested.email,
                        'first_name': user_requested.first_name,
                        'last_name': user_requested.last_name,
                        'img': user_requested.profile.img
                    },
                })
            else:
                return Response({'error': 'not allowed'}, status=405)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except User.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)
        

@api_view(['PUT'])
def update_user(request):
    try:
        if 'username' not in request.data:
            return Response({'error': 'username required'}, status=400)
        user_requested = User.objects.get(username=request.data['username'])
        user = request.user
        if user.is_authenticated:
            if user.is_superuser or user.id == user_requested.id:
                if 'first_name' in request.data:
                    user_requested.first_name = request.data['first_name']
                if 'last_name' in request.data:
                    user_requested.last_name = request.data['last_name']
                if 'img' in request.data:
                    user_requested.profile.img =  request.data['img']
                user_requested.save()
                return Response({
                    'user_info': {
                        'id':user_requested.id,
                        'username': user_requested.username,
                        'email': user_requested.email,
                        'first_name': user_requested.first_name,
                        'last_name': user_requested.last_name,
                        'img': user_requested.profile.img,
                    },
                })
            else:
                return Response({'error': 'not authorized'}, status=401)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except User.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['POST'])
def login_api(request):
    print("LOGIN")
    try:
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
    except User.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['DELETE'])
def delete_user(request):
    try:
        if 'username' not in request.data:
            return Response({'error': 'username required'}, status=400)
        user_requested = User.objects.get(username=request.data['username'])
        user = request.user
        if user.is_authenticated:
            if user.is_superuser or user.id == user_requested.id:
                user_requested.delete()
                return Response({'msg': 'User ' + request.data['username'] + ' deleted'})
            else:
                return Response({'error': 'not authorized'}, status=401)
        else: 
            return Response({'error': 'not authenticated'}, status=401)
    except User.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['GET'])
def read_user_projects(request, username):
    try:
        user = request.user
        user_requested = User.objects.get(username=username)
        user_projects = Project.objects.filter(admin=user_requested)
        if user.is_authenticated:
            if user.is_superuser or user.id == user_requested.id:
                projects = [project.as_json() for project in user_projects]
                return HttpResponse(json.dumps(projects))
            else:
                return Response({'error': 'not allowed'}, status=405)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except User.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)  


#PROJECT ENDPOINTS
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
                    'admin': project.admin.username
                },
            })
        except:
            return Response({'error': 'error in project parameters'})
    else:
        return Response({'error': 'not authenticated'}, status=400)


@api_view(['GET'])
def read_project(request, id):
    try:
        user = request.user
        project_requested = Project.objects.get(id=id)
        if user.is_authenticated:
            if user.is_superuser or user == project_requested.admin:
                return Response({
                    'project_info': {
                        'id':project_requested.id,
                        'name': project_requested.name,
                        'category': project_requested.category,
                        'img': project_requested.img,
                        'admin': project_requested.admin.username,
                    },
                })
            else:
                return Response({'error': 'not allowed'}, status=405)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except Project.DoesNotExist:
        return Response({'error': 'project does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['PUT'])
def update_project(request):
    try:
        if 'id' not in request.data:
            return Response({'error': 'project id required'}, status=400)
        project_requested = Project.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated:
            if user.is_superuser or project_requested.admin == user:
                if 'name' in request.data:
                    project_requested.first_name = request.data['name']
                if 'category' in request.data:
                    project_requested.last_name = request.data['category']
                if 'img' in request.data:
                    project_requested.profile.img =  request.data['img']
                project_requested.save()
                return Response({
                'project_info': {
                    'id': project_requested.id,
                    'name': project_requested.name,
                    'category': project_requested.category,
                    'img': project_requested.img,
                    'admin': project_requested.admin.username
                },
            })
            else:
                return Response({'error': 'not authorized'}, status=401)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except Expense.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['DELETE'])
def delete_project(request):
    user = request.user
    if user.is_authenticated:
        try:
            id = request.data.get('project_id')
            project = Project.objects.get(pk=id)
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


#TODO
#EXPENSE ENDPOINTS
@api_view(['POST'])
def create_expense(request):
    user = request.user
    if user.is_authenticated:
        project_requested = Project.objects.get(id = request.data.get('project_id'))
        user_requested = User.objects.get(username = request.data.get('username'))
        #TODO usuario administra projecto y usuario enviado pertenece projecto
        if (project_requested.admin == user and True) or user.is_superuser:
            amount = float(request.data.get('amount'))
            vatpercentage = float(request.data.get('vatpercentage'))
            try:
                expense = Expense(project=project_requested, 
                    user=user_requested,
                    dossier=request.data.get('dossier'),
                    date=request.data.get('date'),
                    concept=request.data.get('concept'),
                    amount=round(amount, 2),
                    vatpercentage=round(vatpercentage, 2),
                    final_amount=round(amount + (amount * vatpercentage / 100), 2))
                expense.save()
                return Response({
                    'project_info': {
                        'id': expense.id,
                        'dossier': expense.dossier,
                        'date': expense.date,
                        'concept': expense.concept,
                        'amount': expense.amount,
                        'vatpercetange': expense.vatpercentage,
                        'final_amount': expense.final_amount,
                        'project': expense.project.name,
                        'admin': expense.user.username,
                    },
                })
            except:
                return Response({'error': 'error in expense parameters'})
        else: 
            return Response({'error': 'not authorized'}, status=401)
    else:
        return Response({'error': 'not authenticated'}, status=400)


@api_view(['GET'])
def read_expense(request, id):
    try:
        user = request.user
        expense_requested = Expense.objects.get(id=id)
        if user.is_authenticated:
            if user.is_superuser or user == expense_requested.user or user == expense_requested.project.admin:
                return Response({
                    'project_info': {
                        'id': expense_requested.id,
                        'dossier': expense_requested.dossier,
                        'date': expense_requested.date,
                        'concept': expense_requested.concept,
                        'amount': expense_requested.amount,
                        'vatpercetange': expense_requested.vatpercentage,
                        'final_amount': expense_requested.final_amount,
                        'project': expense_requested.project.name,
                        'admin': expense_requested.user.username,
                    },
                })
            else:
                return Response({'error': 'not allowed'}, status=405)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except Expense.DoesNotExist:
        return Response({'error': 'expense does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['PUT'])
def update_expense(request):
    try:
        if 'id' not in request.data:
            return Response({'error': 'project id required'}, status=400)
        expense_requested = Expense.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated:
            #TODO usuario administra projecto y usuario enviado pertenece projecto
            if user.is_superuser or (expense_requested.projet.admin == user and True):
                if 'dossier' in request.data:
                    expense_requested.dossier = request.data['dossier']
                if 'date' in request.data:
                    expense_requested.date = request.data['date']
                if 'concept' in request.data:
                    expense_requested.concept =  request.data['concept']
                if 'amount' in request.data:
                    expense_requested.amount = round(float(request.data['amount']), 2)
                if 'vatpercentage' in request.data:
                    expense_requested.vatpercentage = round(float(request.data['vatpercentage']), 2)
                
                expense_requested.final_amount=round(expense_requested.amount + 
                    (expense_requested.amount * expense_requested.vatpercentage / 100), 2)
                expense_requested.save()
                return Response({
                    'project_info': {
                        'id': expense_requested.id,
                        'dossier': expense_requested.dossier,
                        'date': expense_requested.date,
                        'concept': expense_requested.concept,
                        'amount': expense_requested.amount,
                        'vatpercetange': expense_requested.vatpercentage,
                        'final_amount': expense_requested.final_amount,
                        'project': expense_requested.project.name,
                        'admin': expense_requested.user.username,
                    },
                })
            else:
                return Response({'error': 'not authorized'}, status=401)
        else: 
            return Response({'error': 'not authenticated'}, status=404)
    except Expense.DoesNotExist:
        return Response({'error': 'expense does not exist'}, status=404)
    except:
        return Response({'error': 'not found'}, status=404)


@api_view(['DELETE'])
def delete_expense(request):
    user = request.user
    if user.is_authenticated:
        try:
            expense = Expense.objects.get(pk=request.data.get('id'))
            if user == expense.project.admin or user.is_superuser:
                id = expense.id
                expense.delete()
                return Response({"expense_info": "expense " + str(id) + " deleted"})
            else:
                return Response({'error': 'not authorized'}, status=401)
        except Project.DoesNotExist:
            return Response({'error': 'expense does not exist'}, status=400)
    else:
        return Response({'error': 'not authenticated'}, status=400)


# def get_project_expenses(request, project_id):
#     try:
#         project = Project.objects.get(pk=project_id)
#         expense = Expense.objects.get(project=project)
#         return HttpResponse(serialize('json', [expense]))
#     except Project.DoesNotExist:
#         return HttpResponse("Project Does Not Exist")
#     except Expense.DoesNotExist:
#         return HttpResponse("Expense Does Not Exist")
#     except Expense.MultipleObjectsReturned:
#         expenses = Expense.objects.filter(project=project)
#         return HttpResponse(serialize('json', expenses))