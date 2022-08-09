from rest_framework import serializers

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
        instance.user=self.context.get('user')
        if 'dossier' in self.context:
            instance.dossier=self.context.get('dossier') 
        instance.date=validated_data['date']
        instance.concept=validated_data['concept']
        instance.amount=validated_data['amount']
        instance.vatpercentage=validated_data['vatpercentage']
        instance.final_amount=round(validated_data['amount'] + 
                (validated_data['amount'] * validated_data['vatpercentage'] / 100), 2)
        instance.save() 
        return instance
