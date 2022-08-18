from datetime import datetime
from sqlite3 import Date

from django.contrib.auth.models import User
from projects.models import Project, ProjectMember
from rest_framework.decorators import api_view
from rest_framework.response import Response

from expenses.models import Expense
from expenses.serializers import ExpenseSerializer


@api_view(['POST'])
def create_expense(request):
    try: 
        user = request.user
        if user.is_authenticated:
            project_requested = Project.objects.get(id = request.data['project_id'])
            user_requested = User.objects.get(username__exact = request.data['username'])
            if project_requested.admin == user or ProjectMember.objects.filter(project=project_requested, user=user, is_manager=True).exists():
                serializer = ExpenseSerializer(data=request.data, context={
                    'user': user_requested, 
                    'project': project_requested,
                    'dossier': request.data['dossier'] if 'dossier' in request.data else None
                    })
                serializer.is_valid(raise_exception=True)
                expense = serializer.save()
                return Response({'expense_info': expense.as_json()})
        return Response({'message': 'unauthorized'}, status=401)
    except Exception as e: 
        with open('debug.log', 'a') as f:
            f.write("\n[\""+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"\"]"+" Request: "+request.path+" Error: "+str(e)+"\n")
        return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def read_expense(request, id):
    try:
        user = request.user
        expense_requested = Expense.objects.get(id=id)
        if user.is_authenticated:
            if user == expense_requested.user or user == expense_requested.project.admin or ProjectMember.objects.filter(project=expense_requested.project, user=user, is_manager=True).exists():
                return Response({'expense_info': expense_requested.as_json()})
        return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        with open('debug.log', 'a') as f:
            f.write("\n[\""+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"\"]"+" Request: "+request.path+" Error: "+str(e)+"\n")

        return Response({'message': 'bad request'}, status=400)

@api_view(['PUT'])
def update_expense(request):
    try:
        expense_requested = Expense.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated:
            if user == expense_requested.project.admin or ProjectMember.objects.filter(project=expense_requested.project, user=user, is_manager=True).exists():
                user_requested = User.objects.get(username__exact = request.data['username'])
                serializer = ExpenseSerializer(expense_requested, data=request.data, context={
                    'user': user_requested, 
                    'dossier': request.data['dossier'] if 'dossier' in request.data else None
                    })
                serializer.is_valid(raise_exception=True)
                expense_requested = serializer.save()
                return Response({'expense_info': expense_requested.as_json()})
        return Response({'message': 'unauthorized'}, status=401)
    except Exception as e: 
        with open('debug.log', 'a') as f:
            f.write("\n[\""+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"\"]"+" Request: "+request.path+" Error: "+str(e)+"\n")
        return Response({'message': 'bad request'}, status=400)

@api_view(['DELETE'])
def delete_expense(request, id):
    try:
        user = request.user
        if user.is_authenticated:
            expense = Expense.objects.get(pk=id)
            if user == expense.project.admin or ProjectMember.objects.filter(project=expense.project, user=user, is_manager=True).exists():
                id = expense.id
                expense.delete()
                return Response({"expense_info": "expense " + str(id) + " deleted"})
        return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        with open('debug.log', 'a') as f:
            f.write("\n[\""+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"\"]"+" Request: "+request.path+" Error: "+str(e)+"\n")

        return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def get_project_expenses(request, project_id):
    try:
        user = request.user
        project = Project.objects.get(id=project_id)
        if user.is_authenticated:
            if user == project.admin or ProjectMember.objects.filter(project=project, user=user, is_manager=True).exists():
                expenses = Expense.objects.filter(project=project)
                expenses = [expense.as_json() for expense in expenses]
                return Response({'expenses_info': expenses})
        return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        with open('debug.log', 'a') as f:
            f.write("\n[\""+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"\"]"+" Request: "+request.path+" Error: "+str(e)+"\n")

        return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def get_user_expenses(request):
    try:
        user = request.user
        if user.is_authenticated:
            if request.query_params.get('project_id') != None:
                project = Project.objects.get(id=request.query_params.get('project_id'))
                if request.query_params.get('username') != None and request.query_params.get('username') != user.username:
                    if user == project.admin or ProjectMember.objects.filter(project=project, user=user, is_manager=True).exists():
                        user_requested = User.objects.get(username__exact=request.query_params.get('username'))
                        expenses = Expense.objects.filter(user=user_requested, project=project)
                        expenses = [expense.as_json() for expense in expenses]
                        return Response({'expenses_info': expenses})
                else: 
                    expenses = Expense.objects.filter(user=user, project=project)
                    expenses = [expense.as_json() for expense in expenses]
                    return Response({'expenses_info': expenses})
            else: 
                expenses = Expense.objects.filter(user=user)
                expenses = [expense.as_json() for expense in expenses]
                return Response({'expenses_info': expenses})
        return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        with open('debug.log', 'a') as f:
            f.write("\n[\""+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"\"]"+" Request: "+request.path+" Error: "+str(e)+"\n")

        return Response({'message': 'bad request'}, status=400)
