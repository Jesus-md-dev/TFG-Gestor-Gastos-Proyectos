# Generated by Django 4.0.1 on 2022-02-09 21:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('endpoints', '0005_rename_id_proyect_expense_project_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ip_proyect',
            new_name='ip_project',
        ),
    ]
