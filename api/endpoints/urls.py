from unicodedata import name
from django.urls import path

from . import views

urlpatterns = [
    path('create_user/<str:username>/<str:password>/<str:name>/<str:surname>/<str:email>/',
        views.create_user, name='create user'),
    path('delete_user/<str:username>/', views.delete_user, name='delete user'),
    path('allusers/', views.get_all_user, name="get all users"),
    path('getuser/<str:username>/', views.get_user, name="get user"),
    path('create_project/<str:name>/<str:category>/<str:username>/', views.create_project,
        name="create_project"),
    path('delete_project/<int:id>/', views.delete_project, name="delete proyect"),
    path('allproject/', views.get_all_project, name="get all project"),
    path('getuserprojects/<str:username>/', views.get_user_projects, name="get user projects"),
]
