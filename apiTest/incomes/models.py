from django.db import models
from projects.models import Project


class Income (models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    dossier = models.FileField(upload_to='documents')
    date = models.DateField()
    concept = models.CharField(max_length=100)
    amount = models.FloatField()

    def as_json(self):
        return dict(id=self.id, project=self.project.id, 
            dossier=self.dossier.url if self.dossier else None, 
            date=str(self.date), concept=self.concept, 
            amount=self.amount)
