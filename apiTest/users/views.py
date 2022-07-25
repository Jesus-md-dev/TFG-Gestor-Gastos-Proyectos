from django.contrib.auth.models import User
from knox.auth import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer

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

@api_view(['POST'])
def create_user(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    try: 
        user = serializer.save()
        if(request.data.get('img') != None):
            user.profile.img = request.data.get('img')
        user.save()
        _, token = AuthToken.objects.create(user)
        return Response({
                'user_info': user.profile.as_json(),
                'token': token
                })
    except Exception as e:
        user.delete()
        return Response({'message': 'bad request'}, status=400)

@api_view(['GET'])
def read_user(request, username):
    try:
        user = request.user
        user_requested = User.objects.get(username=username)
        if user.is_authenticated:
            return Response({'user_info': user_requested.profile.as_json()})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)
        
@api_view(['PUT'])
def update_user(request):
    try:
        user_requested = User.objects.get(username=request.data['username'])
        user = request.user
        if user.is_authenticated and user.id == user_requested.id:
            serializer = UserSerializer(user_requested, request.data, 
                context={'img': request.data['img']})
            serializer.is_valid(raise_exception=True)
            user_requested = serializer.save()
            return Response({'user_info': user.profile.as_json()})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['POST'])
def login_api(request):
    try:
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        _, token = AuthToken.objects.create(user)
        return Response({'user_info': user.profile.as_json(),'token': token})
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

@api_view(['DELETE'])
def delete_user(request, username):
    try:
        user_requested = User.objects.get(username=username)
        user = request.user
        if user.is_authenticated and user.username == user_requested.username:
            username = user_requested.username
            if(user_requested.profile.img.url != "/media/userdefault.jpg"):
                user_requested.profile.img.delete()
            user_requested.delete()
            return Response({'user_info': 'User ' + username + ' deleted'})
        else: 
            return Response({'message': 'unauthorized'}, status=401)
    except Exception as e:
        return Response({'message': 'bad request'}, status=400)

