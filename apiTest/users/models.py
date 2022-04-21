from unicodedata import category
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Project (models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.URLField(default="")

    def as_json(self):
        return dict(id=self.id, name=self.name, category=self.category, 
            admin=self.admin.username, img=self.img)


class Expense (models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dossier = models.CharField(max_length=100)
    date = models.DateTimeField()
    concept = models.CharField(max_length=100)
    amount = models.FloatField()
    vatpercentage = models.IntegerField()
    final_amount = models.FloatField()

    def as_json(self):
        return dict(id=self.id, project=self.project.name, user=self.user.username, 
            dossier=self.dossier, date=str(self.date), concept=self.concept, 
            amount=self.amount, vatpercentage=self.vatpercentage, 
            final_amount=self.final_amount)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    img = models.TextField(max_length=500, blank=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class ProjectMember (models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_ip = models.BooleanField()