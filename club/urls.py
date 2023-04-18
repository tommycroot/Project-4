from django.contrib import admin
from django.urls import path
from .views import ClubListView

urlpatterns = [
    path('', ClubListView.as_view()), 
]
