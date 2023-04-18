from django.contrib import admin
from django.urls import path
from .views import MatchDetailsListView


# /api/oceans/:id

urlpatterns = [
    path('', MatchDetailsListView.as_view())
]
