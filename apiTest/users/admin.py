from django.contrib import admin
from users.models import Project, Expense, Profile, ProjectMember


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    pass