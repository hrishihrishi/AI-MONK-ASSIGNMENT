from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagTreeViewSet

router = DefaultRouter()
router.register(r'trees', TagTreeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]