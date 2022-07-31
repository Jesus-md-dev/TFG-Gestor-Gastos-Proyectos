from django.urls import path

from . import views

urlpatterns = [
    path('create_project/', views.create_project),
    path('project/<int:id>', views.read_project),
    path('update_project/', views.update_project),
    path('delete_project/<int:id>', views.delete_project),
    path('projects/<str:username>', views.read_user_projects),

    path('add_member_project/', views.add_project_member),
    path('member_projects/<str:username>', views.read_user_member_projects),
    path('project_members/<int:project_id>', views.read_project_members),
    path('delete_project_member/', views.delete_project_member),
    path('promote_project_member/', views.promote_project_member),
    path('demote_project_member/', views.demote_project_member),
]
