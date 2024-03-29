from django.contrib.auth.models import User
from django.core.files.storage import default_storage
from django.db import models


def upload_to(instance, filename):
    return 'project/{filename}'.format(filename=filename)

class Project (models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.ImageField(("Image"), upload_to=upload_to, default='projectdefault.jpg')

    def as_json(self):
        if not self.img or not default_storage.exists(self.img.name):
            self.img = 'projectdefault.jpg'
            self.save()
        return dict(id=self.id, name=self.name, category=self.category, 
            admin=self.admin.username, img=self.img.url)

class ProjectMember (models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_manager = models.BooleanField()

    def as_json(self):
        return dict(id=self.id, project=self.project.id, user=self.user.username, 
            is_manager=self.is_manager)
