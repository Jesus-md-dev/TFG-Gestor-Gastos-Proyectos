import json
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from expenses.models import Expense
from projects.models import Project, ProjectMember


@api_view(['GET'])
def get_all_project(request):
        user = request.user
        if user.is_authenticated and user.is_superuser:
            projects = Project.objects.all()
            projects = [project.as_json() for project in projects]
            return HttpResponse(json.dumps(projects))
        else: 
            return Response({'message': 'unauthorized'}, status=401)

            
@api_view(['POST'])
def create_project(request):
    user = request.user
    if user.is_authenticated:
        try:
            project = Project(name=request.data.get('name'), 
                category=request.data.get('category'), admin=user)
            if(request.data.get('img') != None):
                project.img = request.data.get('img')
            project.save()
            return Response({
                'project_info': {
                    'id': project.id,
                    'name': project.name,
                    'category': project.category,
                    'img': project.img.url,
                    'admin': project.admin.username
                },
            })
        except:
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)


@api_view(['GET'])
def read_project(request, id):
    try:
        user = request.user
        project_requested = Project.objects.get(id=id)
        if user.is_authenticated and user == project_requested.admin:
            return Response({
                'project_info': {
                    'id':project_requested.id,
                    'name': project_requested.name,
                    'category': project_requested.category,
                    'img': project_requested.img.url,
                    'admin': project_requested.admin.username,
                },
            })
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)


@api_view(['PUT'])
def update_project(request):
        project_requested = Project.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated and project_requested.admin == user:
            if 'name' in request.data:
                project_requested.first_name = request.data['name']
            if 'category' in request.data:
                project_requested.last_name = request.data['category']
            if(request.data['img'] != "null"):
                if(project_requested.img.url != "projectdefault.jpg"):
                    project_requested.img.delete()
                project_requested.img = request.data['img']
            project_requested.save()
            return Response({
                'project_info': {
                    'id': project_requested.id,
                    'name': project_requested.name,
                    'category': project_requested.category,
                    'img': project_requested.img.url,
                    'admin': project_requested.admin.username
                },
            })
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    


@api_view(['DELETE'])
def delete_project(request, id):
    user = request.user
    if user.is_authenticated:
        try:
            project = Project.objects.get(pk=id)
            if user == project.admin:
                name = project.name
                project.delete()
                return Response({"project_info": "project " + name + " deleted"})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        except Project.DoesNotExist:
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)


#PROJECTMEMBER ENDPOINTS
@api_view(['POST'])
def add_project_member(request):
    try:
        user = request.user
        if user.is_authenticated:
            project_requested = Project.objects.get(id=request.data.get('project_id'))
            if project_requested.admin == user:
                username_list = request.data.get('usernames')['usernames']
                new_project_members = []
                for username in username_list:
                    user = User.objects.get(username=username)
                    lenvalue=len(ProjectMember.objects.filter(project=project_requested, user=user))
                    if len(ProjectMember.objects.filter(project=project_requested, user=user)) == 0:
                        project_member = ProjectMember(project=project_requested, user=user, is_ip=False)
                        # project_member.save()
                        new_project_members.append(project_member)
                    else: 
                        return Response({'message': 'bad request'}, status=400)
                new_project_member_json = [project_member.as_json() for project_member
                    in new_project_members]
                for project_member in new_project_members:
                    project_member.save()
                return Response(json.dumps(new_project_member_json))
            else: 
                return Response({'message': 'unauthorized'}, status=401)
        else:
            return Response({'message': 'unauthorized'}, status=401)
    except ProjectMember.DoesNotExist:
        return Response({'message': 'bad request'}, status=400)


@api_view(['GET'])
def read_project_member(request, project_id):
    try:
        user = request.user
        project_requested = Project.objects.get(id = project_id)
        if user.is_authenticated and user == project_requested.admin:
            user_list = []
            members = ProjectMember.objects.filter(project=project_requested)
            for member in members:
                user = member.user
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
                user_dict['img'] = user.profile.img.url
                user_list.append(user_dict)
            return JsonResponse(user_list, safe=False)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)


@api_view(['DELETE'])
def delete_project_member(request):
    user = request.user
    if user.is_authenticated:
        try:
            project = Project.objects.get(id=request.data.get('project_id'))
            member = User.objects.get(id=request.data.get('member_id'))
            project_member = ProjectMember.objects.get(project=project, user=member)
            if user == project.admin:
                project_member.delete()
                return Response({"expense_info": "project_member deleted"})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        except: 
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)
