from django.contrib import admin
from expenses.models import Expense
from projects.models import Project, ProjectMember

from users.models import Profile


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'admin', 'img')

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_project_name', 'user', 'dossier', 'date',
     'concept', 'amount', 'vatpercentage', 'final_amount')

    def get_project_name(self, obj):
        return obj.project.name
    get_project_name.short_description = 'Project Name'
    get_project_name.admin_order_field = 'project__name'

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'img')

@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_project_name', 'user', 'is_ip')

    def get_project_name(self, obj):
        return obj.project.name
    get_project_name.short_description = 'Project Name'
    get_project_name.admin_order_field = 'project__name'
