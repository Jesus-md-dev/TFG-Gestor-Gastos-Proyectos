from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

from projects.models import Project, ProjectMember
from projects.serializers import ProjectSerializer


@api_view(['POST'])
def create_project(request):
    try:
        user = request.user
        if user.is_authenticated:
            serializer = ProjectSerializer(data=request.data, context={'user': user})
            serializer.is_valid(raise_exception=True)
            project = serializer.save()
            return Response({'project_info': project.as_json()})
        else:
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
            return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def read_project(request, id):
    try:
        user = request.user
        project_requested = Project.objects.get(id=id)
        if user.is_authenticated and user == project_requested.admin:
            return Response({'project_info': project_requested.as_json()})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['PUT'])
def update_project(request):
    try:
        project_requested = Project.objects.get(id=request.data['id'])
        user = request.user
        if user.is_authenticated and project_requested.admin == user:
            serializer = ProjectSerializer(project_requested, data=request.data)
            serializer.is_valid(raise_exception=True)
            project = serializer.save()
            return Response({'project_info': project.as_json()})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['DELETE'])
def delete_project(request, id):
    try:
        user = request.user
        if user.is_authenticated:
            project = Project.objects.get(id=id)
            if user == project.admin:
                name = project.name
                project.delete()
                return Response({"project_info": "project " + name + " deleted"})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else:
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def read_user_projects(request, username):
    try:
        user = request.user
        user_requested = User.objects.get(username=username)
        if user.is_authenticated and user.id == user_requested.id:
                user_projects = Project.objects.filter(admin=user_requested)
                projects = [project.as_json() for project in user_projects]
                return Response({'projects_info': projects})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

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
                    if len(ProjectMember.objects.filter(project=project_requested, user=user)) == 0:
                        project_member = ProjectMember(project=project_requested, user=user, is_manager=False)
                        new_project_members.append(project_member)
                    else: 
                        return Response({'message': 'bad request'}, status=400)
                new_project_member_json = [project_member.as_json() for project_member
                    in new_project_members]
                for project_member in new_project_members:
                    project_member.save()
                return Response({'project_member_info': new_project_member_json})
            else: 
                return Response({'message': 'unauthorized'}, status=401)
        else:
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def read_project_members(request, project_id):
    try:
        user = request.user
        project_requested = Project.objects.get(id = project_id)
        if user.is_authenticated and user == project_requested.admin:
            user_list = []
            members = ProjectMember.objects.filter(project=project_requested)
            for member in members:
                user_json = member.user.profile.as_json()
                user_json['is_manager'] = member.is_manager
                user_list.append(user_json)
            return Response({'members_info': user_list})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
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
                return Response({"project_member_info": "project_member deleted"})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        except Exception as e:
            return Response({'message': 'bad request'}, status=400)
    else:
        return Response({'message': 'unauthorized'}, status=401)

@api_view(['PUT'])
def promote_project_member(request):
    try:
        user = request.user
        if user.is_authenticated:
            project = Project.objects.get(id=request.data.get('project_id'))
            member = User.objects.get(username=request.data.get('member_id'))
            project_member = ProjectMember.objects.get(project=project, user=member)
            if user == project.admin:
                project_member.is_manager = True
                project_member.save()
                return Response({"project_member_info": project_member.as_json()})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else:
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
            return Response({'message': 'bad request'}, status=400)

@api_view(['PUT'])
def demote_project_member(request):
    try:
        user = request.user
        if user.is_authenticated:
            project = Project.objects.get(id=request.data.get('project_id'))
            member = User.objects.get(username=request.data.get('member_id'))
            project_member = ProjectMember.objects.get(project=project, user=member)
            if user == project.admin:
                project_member.is_manager = False
                project_member.save()
                return Response({"project_member_info": project_member.as_json()})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else:
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
            return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def read_user_member_projects(request, username):
    try:
        user = request.user
        user_requested = User.objects.get(username=username)
        if user.is_authenticated:
            if user.id == user_requested.id:
                project_members = ProjectMember.objects.filter(user=user_requested)
                projects = [project_member.project.as_json() for project_member 
                    in project_members]
                return Response({'projects_info': projects})
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        print(e)
        return Response({'message': 'bad request'}, status=400)
