from django.urls import path
from . import views
from knox import views as knox_views

urlpatterns = [
    path('clear_users/', views.clear_users),
    path('tokenavailable/', views.is_token_available),
    path('isalive/', views.is_alive),

    path('login/', views.login_api),
    path('logout/', knox_views.LogoutView.as_view()),
    path('logoutall/', knox_views.LogoutAllView.as_view()),
    path('register/', views.create_user),
    path('user/<str:username>', views.read_user),
    path('update_user/', views.update_user),
    path('delete_user/', views.delete_user),
    path('projects/<str:username>', views.read_user_projects),
    path('member_projects/<str:username>', views.read_user_member_projects),
    path('users', views.get_all_users),
]