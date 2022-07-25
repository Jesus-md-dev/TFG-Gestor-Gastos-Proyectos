from django.contrib.auth.models import User
from projects.models import Project, ProjectMember
from rest_framework.decorators import api_view
from rest_framework.response import Response

from expenses.models import Expense
from expenses.serializers import ExpenseSerializer


@api_view(['POST'])
def create_expense(request):
    user = request.user
    if user.is_authenticated:
        try: 
            project_requested = Project.objects.get(id = request.data['project_id'])
            user_requested = User.objects.get(username = request.data['username'])
            if user_requested != project_requested.admin:
                ProjectMember.objects.get(project=project_requested, user=user_requested)
            if project_requested.admin == user:
                serializer = ExpenseSerializer(data=request.data, context={
                    'user': user_requested, 
                    'project': project_requested,
                    'dossier': request.data['dossier'] if 'dossier' in request.data else None
                    })
                serializer.is_valid(raise_exception=True)
                expense = serializer.save()
                return Response({'expense_info': expense.as_json()})
            else: 
                return Response({'message': 'unauthorized'}, status=401)
        except Exception as e: 
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)

@api_view(['GET'])
def read_expense(request, id):
    try:
        user = request.user
        expense_requested = Expense.objects.get(id=id)
        if user.is_authenticated:
            if user == expense_requested.user or user == expense_requested.project.admin:
                return Response({'expense_info': expense_requested.as_json()})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['PUT'])
def update_expense(request):
    try:
        expense_requested = Expense.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated:
            user_requested = User.objects.get(username = request.data['username'])
            if user_requested != expense_requested.project.admin:
                ProjectMember.objects.get(project=expense_requested.project, user=user_requested)
            if expense_requested.project.admin.username == user.username and True:
                serializer = ExpenseSerializer(expense_requested, data=request.data, context={
                    'user': user_requested, 
                    'dossier': request.data['dossier'] if 'dossier' in request.data else None
                    })
                serializer.is_valid(raise_exception=True)
                expense_requested = serializer.save()
                return Response({'expense_info': expense_requested.as_json()})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['DELETE'])
def delete_expense(request, id):
    user = request.user
    if user.is_authenticated:
        try:
            expense = Expense.objects.get(pk=id)
            if user == expense.project.admin:
                id = expense.id
                expense.delete()
                return Response({"expense_info": "expense " + str(id) + " deleted"})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        except Project.DoesNotExist:
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)

@api_view(['GET'])
def get_project_expenses(request, project_id):
    try:
        user = request.user
        project = Project.objects.get(id=project_id)
        if user.is_authenticated and project.admin == user:
            expenses = Expense.objects.filter(project=project)
            expenses = [expense.as_json() for expense in expenses]
            return Response({'expenses_info': expenses})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def get_own_expenses(request):
    try:
        user = request.user
        if user.is_authenticated:
            expenses = Expense.objects.filter(user=user)
            expenses = [expense.as_json() for expense in expenses]
            return Response({'expenses_info': expenses})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)
