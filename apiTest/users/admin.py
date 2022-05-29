from django.contrib import admin
from expenses.models import Expense
from projects.models import Project, ProjectMember
from users.models import Profile


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'admin', 'img')


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'user', 'dossier', 'date', 'concept', 'amount',
     'vatpercentage', 'final_amount')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'img')


@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'user', 'is_ip')