from django.contrib.auth.models import User
from rest_framework import serializers, validators
from users.models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

        extra_kwargs = {
            "password": {"write_only": True},
            "email": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        User.objects.all(), "A user with that Email already exists"
                    )
                ]
            }
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        email = validated_data.get('email')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        user = User.objects.create_user(
            username = username,
            password = password,
            email = email,
            first_name = first_name, 
            last_name = last_name,
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')

    def update(self, instance, validated_data): 
        # instance.username = validated_data.get('username')
        # instance.password = validated_data.get('password')
        # instance.email = validated_data.get('email')
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')
        if('img' in self.context and self.context.get('img') != "null"):
                if(instance.profile.img.url != "userdefault.jpg"):
                    instance.profile.img.delete()
                instance.profile.img = self.context.get('img')
        instance.save() 
        return instance

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('img')

    def create(self, validated_data):
        if 'img' in validated_data:
            profile = Profile(
                user = self.context.get("user"),
                img = validated_data['img']
            )
        else: 
            profile = Profile(user = self.context.get("user"))
        profile.save()
        return profile

    def update(self, instance, validated_data): 
        if('img' in validated_data and validated_data.get('img') != "null"):
            if(instance.img.url != "projectdefault.jpg"):
                instance.img.delete()
            instance.img = validated_data.get('img')
        instance.save() 
        return instance
