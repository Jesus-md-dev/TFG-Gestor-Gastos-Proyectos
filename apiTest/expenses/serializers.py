from wsgiref import validate

from django.contrib.auth.models import User
from rest_framework import serializers, validators

from expenses.models import Expense


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('date', 'concept', 'amount', 
            'vatpercentage')

    def create(self, validated_data):
        expense = Expense(
            project=self.context.get('project'),
            user=self.context.get('user'),
            dossier=self.context.get('dossier') if 'dossier' in self.context else None,
            date=validated_data['date'],
            concept=validated_data['concept'],
            amount=validated_data['amount'],
            vatpercentage=validated_data['vatpercentage'],
            final_amount=
                round(validated_data['amount'] + 
                (validated_data['amount'] * validated_data['vatpercentage'] / 100), 2)
        )
        expense.save()
        return expense

    def update(self, instance, validated_data): 
        instance.name = validated_data.get('name')
        instance.category = validated_data.get('category')
        if('img' in validated_data and validated_data.get('img') != "null"):
            if(instance.img.url != "projectdefault.jpg"):
                instance.img.delete()
            instance.img = validated_data.get('img')
        instance.save() 
        return instance
