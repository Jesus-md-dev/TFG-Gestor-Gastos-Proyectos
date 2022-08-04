from django.urls import path

from . import views

urlpatterns = [
    path('create_income/', views.create_income),
    path('income/<int:id>', views.read_income),
    path('update_income/', views.update_income),
    path('delete_income/<int:id>', views.delete_income),
    path('incomes/<int:project_id>', views.get_project_incomes),
]
