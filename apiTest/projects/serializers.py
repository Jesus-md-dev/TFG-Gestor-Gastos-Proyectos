from rest_framework import serializers

from projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'category', 'img']

    def create(self, validated_data):
        if 'img' in validated_data:
            project = Project(
                admin = self.context.get("user"),
                name = validated_data['name'],
                category = validated_data['category'],
                img = validated_data['img']
            )
        else: 
            project = Project(
                admin = self.context.get("user"),
                name = validated_data['name'],
                category = validated_data['category'],
            )
        project.save()
        return project

    def update(self, instance, validated_data): 
        instance.name = validated_data.get('name')
        instance.category = validated_data.get('category')
        if('img' in validated_data and validated_data.get('img') != "null"):
            if(instance.img.url != "projectdefault.jpg"):
                instance.img.delete()
            instance.img = validated_data.get('img')
        instance.save() 
        return instance
