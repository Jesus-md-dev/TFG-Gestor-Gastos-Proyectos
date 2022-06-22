import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from expenses.models import Expense
from projects.models import Project


@api_view(['GET'])
def get_all_expenses(request):
        user = request.user
        if user.is_authenticated and user.is_superuser:
            expenses = Expense.objects.all()
            expenses = [expense.as_json() for expense in expenses]
            return HttpResponse(json.dumps(expenses))
        else: 
            return Response({'message': 'unauthorized'}, status=401)



@api_view(['POST'])
def create_expense(request):
    user = request.user
    if user.is_authenticated:
        try: 
            aux = request.data['project_id']
            project_requested = Project.objects.get(id = request.data['project_id'])
            user_requested = User.objects.get(username = request.data['username'])
            #TODO usuario enviado pertenece projecto

            if project_requested.admin == user:
                amount = float(request.data['amount'])
                vatpercentage = float(request.data['vatpercentage'])
                expense = Expense(project=project_requested, 
                    user=user_requested,
                    dossier=request.data['dossier'],
                    date=request.data['date'],
                    concept=request.data['concept'],
                    amount=round(amount, 2),
                    vatpercentage=round(vatpercentage, 2),
                    final_amount=round(amount + (amount * vatpercentage / 100), 2))
                expense.save()
                return Response({
                    'project_info': {
                        'id': expense.id,
                        'dossier': expense.dossier.url,
                        'date': expense.date,
                        'concept': expense.concept,
                        'amount': expense.amount,
                        'vatpercetange': expense.vatpercentage,
                        'final_amount': expense.final_amount,
                        'project': expense.project.name,
                        'username': expense.user.username,
                    },
                })
            else: 
                return Response({'message': 'unauthorized'}, status=401)
        except Exception as e: 
            print('%s' % type(e))
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
                return Response({
                    'expense_info': {
                        'id': expense_requested.id,
                        'dossier': expense_requested.dossier.url,
                        'date': expense_requested.date,
                        'concept': expense_requested.concept,
                        'amount': expense_requested.amount,
                        'vatpercetange': expense_requested.vatpercentage,
                        'final_amount': expense_requested.final_amount,
                        'project': expense_requested.project.name,
                        'username': expense_requested.user.username,
                    },
                })
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)


@api_view(['PUT'])
def update_expense(request):
    try:
        expense_requested = Expense.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated:
            #TODO usuario administra projecto y usuario enviado pertenece projecto
            if expense_requested.projet.admin == user and True:
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
                    'expense_info': {
                        'id': expense_requested.id,
                        'dossier': expense_requested.dossier.url,
                        'date': expense_requested.date,
                        'concept': expense_requested.concept,
                        'amount': expense_requested.amount,
                        'vatpercetange': expense_requested.vatpercentage,
                        'final_amount': expense_requested.final_amount,
                        'project': expense_requested.project.name,
                        'user': expense_requested.user.username,
                    },
                })
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
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
            return HttpResponse(json.dumps(expenses))
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)
