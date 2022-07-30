from projects.models import Project
from rest_framework.decorators import api_view
from rest_framework.response import Response

from incomes.models import Income
from incomes.serializers import IncomeSerializer


@api_view(['POST'])
def create_income(request):
    user = request.user
    if user.is_authenticated:
        try: 
            project_requested = Project.objects.get(id = request.data['project_id'])
            if project_requested.admin == user:
                serializer = IncomeSerializer(data=request.data, context={
                    'project': project_requested,
                    'dossier': request.data['dossier'] if 'dossier' in request.data else None
                    })
                serializer.is_valid(raise_exception=True)
                income = serializer.save()
                return Response({'income_info': income.as_json()})
            else: 
                return Response({'message': 'unauthorized'}, status=401)
        except Exception as e: 
            print(e)
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)

@api_view(['GET'])
def read_income(request, id):
    try:
        user = request.user
        income_requested = Income.objects.get(id=id)
        if user.is_authenticated:
            if user == income_requested.project.admin:
                return Response({'income_info': income_requested.as_json()})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        print(e)
        return Response({'message': 'bad request'}, status=400)

@api_view(['PUT'])
def update_income(request):
    try:
        income_requested = Income.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated:
            if income_requested.project.admin.username == user.username and True:
                serializer = IncomeSerializer(income_requested, data=request.data, context={
                    'dossier': request.data['dossier'] if 'dossier' in request.data else None
                    })
                serializer.is_valid(raise_exception=True)
                income_requested = serializer.save()
                return Response({'income_info': income_requested.as_json()})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        print(e)
        return Response({'message': 'bad request'}, status=400)

@api_view(['DELETE'])
def delete_income(request, id):
    user = request.user
    if user.is_authenticated:
        try:
            income = Income.objects.get(pk=id)
            if user == income.project.admin:
                id = income.id
                income.delete()
                return Response({"income_info": "income " + str(id) + " deleted"})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        except Project.DoesNotExist:
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)

@api_view(['GET'])
def get_project_incomes(request, project_id):
    try:
        user = request.user
        project = Project.objects.get(id=project_id)
        if user.is_authenticated and project.admin == user:
            incomes = Income.objects.filter(project=project)
            incomes = [income.as_json() for income in incomes]
            return Response({'incomes_info': incomes})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        print(e)
        return Response({'message': 'bad request'}, status=400)
