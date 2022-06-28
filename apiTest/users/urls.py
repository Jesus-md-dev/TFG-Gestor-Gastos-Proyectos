from django.urls import path
from . import views
from knox import views as knox_views

urlpatterns = [
    path('tokenavailable/', views.is_token_available),
    path('isalive/', views.is_alive),
    path('login/', views.login_api),
    path('logout/', knox_views.LogoutView.as_view()),
    path('logoutall/', knox_views.LogoutAllView.as_view()),
    path('register/', views.create_user),
    path('user/<str:username>', views.read_user),
    path('update_user/', views.update_user),
    path('delete_user/<str:username>', views.delete_user),
]