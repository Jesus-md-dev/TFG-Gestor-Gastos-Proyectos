from rest_framework import serializers
from incomes.models import Income


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('date', 'concept', 'amount')

    def create(self, validated_data):
        income = Income(
            project=self.context.get('project'),
            dossier=self.context.get('dossier') if 'dossier' in self.context else None,
            date=validated_data['date'],
            concept=validated_data['concept'],
            amount=validated_data['amount'],
        )
        income.save()
        return income

    def update(self, instance, validated_data): 
        if 'dossier' in self.context:
            instance.dossier=self.context.get('dossier') 
        instance.date=validated_data['date']
        instance.concept=validated_data['concept']
        instance.amount=validated_data['amount']
        instance.save() 
        return instance
