from django.contrib import admin

from incomes.models import Income


@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_project_name', 'dossier', 'date',
     'concept', 'amount')

    def get_project_name(self, obj):
        return obj.project.name
    get_project_name.short_description = 'Project Name'
    get_project_name.admin_order_field = 'project__name'
