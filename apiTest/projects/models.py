from django.db import models
from django.contrib.auth.models import User

class Project (models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.URLField(default="")

    def as_json(self):
        return dict(id=self.id, name=self.name, category=self.category, 
            admin=self.admin.username, img=self.img)


class ProjectMember (models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_ip = models.BooleanField()

    def as_json(self):
        return dict(id=self.id, project=self.project.id, user=self.user.username, 
            is_ip=self.is_ip)