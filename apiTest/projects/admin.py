from django.contrib import admin
from projects.models import Project, ProjectMember


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'admin', 'img')

@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_project_name', 'user', 'is_manager')

    def get_project_name(self, obj):
        return obj.project.name
    get_project_name.short_description = 'Project Name'
    get_project_name.admin_order_field = 'project__name'
