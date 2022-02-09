from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('insert/<str:name>/', views.insert, name='insert'),
    path('select/<str:name>/', views.select_name, name='select'),
    path('delete/<str:name>/', views.delete_name, name='delete_name'),
    path('deleteall/', views.delete_all, name='delete_all'),
]