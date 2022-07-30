# Generated by Django 4.0.4 on 2022-07-29 17:15

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0005_alter_expense_vatpercentage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='vatpercentage',
            field=models.FloatField(validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(100.0)]),
        ),
    ]
