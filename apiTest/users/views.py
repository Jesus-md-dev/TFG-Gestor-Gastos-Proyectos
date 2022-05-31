import json
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken

from projects.models import Project, ProjectMember
from .serializers import RegisterSerializer
from django.contrib.auth.models import User


#MUST DELETE ENDPOINTS
@api_view(['GET'])
def clear_users(request):
    users = User.objects.all()
    for user in users:
        if not user.is_superuser:
            user.delete()
    return Response({'message': 'clear'})

#ADMIN ENDPOINTS
@api_view(['GET'])
def is_token_available(request):
    user = request.user
    if user.is_authenticated:
        return Response({'token_info': 'token available'})
    else: 
        return Response({'message': 'unauthorized'}, status=401)

        
@api_view(['GET'])
def is_alive(request):
    return Response({'message': 'available'})


@api_view(['GET'])
def get_all_users(request):
    try:
        user = request.user
        if user.is_authenticated and user.is_superuser:
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
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)


#USER ENDPOINTS
@api_view(['POST'])
def create_user(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    user.profile.img = request.data.get('img') if request.data.get('img') else ""
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



@api_view(['GET'])
def read_user(request, username):
    try:
        user = request.user
        user_requested = User.objects.get(username=username)
        if user.is_authenticated:
            # if user.id == user_requested.id:
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
            # else:
            #     return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)
        

@api_view(['PUT'])
def update_user(request):
    try:
        user_requested = User.objects.get(username=request.data['username'])
        user = request.user
        if user.is_authenticated and user.id == user_requested.id:
            user_requested.first_name = request.data['first_name']
            user_requested.last_name = request.data['last_name']
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
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)


@api_view(['POST'])
def login_api(request):
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
    except:
        return Response({'message': 'bad request'}, status=400)


@api_view(['DELETE'])
def delete_user(request, username):
    try:
        user_requested = User.objects.get(username=username)
        user = request.user
        if user.is_authenticated and user.username == user_requested.username:
            username = user_requested.username
            user_requested.delete()
            return Response({'user_info': 'User ' + username + ' deleted'})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)


@api_view(['GET'])
def read_user_projects(request, username):
    try:
        user = request.user
        user_requested = User.objects.get(username=username)
        if user.is_authenticated and user.id == user_requested.id:
                user_projects = Project.objects.filter(admin=user_requested)
                projects = [project.as_json() for project in user_projects]
                return HttpResponse(json.dumps(projects))
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
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
                return HttpResponse(json.dumps(projects))
            else:
                return Response({'message': 'unauthorized'}, status=401)
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except:
        return Response({'message': 'bad request'}, status=400)