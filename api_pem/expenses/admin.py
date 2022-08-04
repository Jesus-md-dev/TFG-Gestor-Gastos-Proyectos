from django.contrib import admin
from expenses.models import Expense

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_project_name', 'user', 'dossier', 'date',
     'concept', 'amount', 'vatpercentage', 'final_amount')

    def get_project_name(self, obj):
        return obj.project.name
    get_project_name.short_description = 'Project Name'
    get_project_name.admin_order_field = 'project__name'
