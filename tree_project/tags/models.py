# Create your models here.
from django.db import models

class TagTree(models.Model):
    # This stores the entire nested JSON structure (name, children, data)
    content = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Tree {self.id} - {self.content.get('name', 'Untitled')}"