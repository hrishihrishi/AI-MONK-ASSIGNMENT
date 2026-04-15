from rest_framework import serializers
from .models import TagTree

class TagTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagTree
        fields = ['id', 'content']