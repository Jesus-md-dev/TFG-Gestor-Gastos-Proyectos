# Generated by Django 4.0.1 on 2022-02-09 21:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('endpoints', '0004_rename_proyect_project'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expense',
            old_name='id_proyect',
            new_name='project',
        ),
        migrations.RenameField(
            model_name='expense',
            old_name='id_user',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='ip_proyect',
            old_name='proyect',
            new_name='project',
        ),
    ]
