from django.contrib import admin
from expenses.models import Expense
from projects.models import Project, ProjectMember
from users.models import Profile


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'admin', 'img')


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    pass