from django.contrib import admin
from django.urls import path
from .views import FriendListView, FriendDetailView


urlpatterns = [
    path('', FriendListView.as_view()),
    path('<int:pk>/', FriendDetailView.as_view())
]
