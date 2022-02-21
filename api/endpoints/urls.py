from django.urls import path, register_converter
from . import converters, views

register_converter(converters.FourDigitConverter, 'dddd')
register_converter(converters.TwoDigitConverter, 'dd')

urlpatterns = [
    path('create_user/<str:username>/<str:password>/<str:name>/<str:surname>/<str:email>/',
        views.create_user, name='create user'),
    path('delete_user/<str:username>/', views.delete_user, name='delete user'),
    path('get_all_users/', views.get_all_user, name="get all users"),
    path('get_user/<str:username>/', views.get_user, name="get user"),
    path('create_project/<str:name>/<str:category>/<str:username>/', views.create_project,
        name="create_project"),
    path('delete_project/<int:id>/', views.delete_project, name="delete proyect"),
    path('get_all_project/', views.get_all_project, name="get all project"),
    path('get_user_projects/<str:username>/', views.get_user_projects,
        name="get user projects"),
    path('create_expense/<int:project_id>/<str:username>/<str:dossier>/<dddd:year>' + 
        '/<dd:month>/<dd:day>/<dd:hour>/<dd:minutes>/<str:concept>' + 
        '/<int:amount>/<int:vatpercentage>/', views.create_expense, 
        name="get create expense"),
    path('get_all_expense/', views.get_all_expense, name="get all expense"),
    path('get_project_expenses/<int:project_id>/', views.get_project_expenses,
        name="get project expenses"),
    path('delete_expense/<int:id>/', views.delete_expense, name="delete expense"),
]