from rest_framework import viewsets
from .models import TagTree
from .serializers import TagTreeSerializer

class TagTreeViewSet(viewsets.ModelViewSet):
    queryset = TagTree.objects.all()
    serializer_class = TagTreeSerializer