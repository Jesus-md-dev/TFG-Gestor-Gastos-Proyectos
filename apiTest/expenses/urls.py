from django.urls import path
from . import views

urlpatterns = [
    path('create_expense/', views.create_expense),
    path('expense/<int:id>', views.read_expense),
    path('update_expense/', views.update_expense),
    path('delete_expense/<int:id>', views.delete_expense),
    path('expenses/<int:project_id>', views.get_all_expenses),
    path('expenses/', views.get_all_expenses),
]