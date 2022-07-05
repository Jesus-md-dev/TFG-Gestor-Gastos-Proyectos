from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


def upload_to(instance, filename):
    return 'user/{filename}'.format(filename=filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    img = models.ImageField(("Image"), upload_to=upload_to, default='userdefault.jpg')

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    def as_json(self):
        if not self.img: #TODO if file does not exists
            self.img = 'projectdefault.jpg'
            self.save()
        # return {
        #     'id':self.user.id, 
        #     'username':self.user.username, 
        #     'email':self.user.email, 
        #     'first_name':self.user.first_name, 
        #     'last_name':self.user.last_name, 
        #     'img':self.img.url
        # } 
        return dict(id=self.user.id, username=self.user.username, email=self.user.email, 
            first_name=self.user.first_name, last_name=self.user.last_name, 
            img=self.img.url)

    