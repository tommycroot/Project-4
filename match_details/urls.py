from django.contrib import admin
from django.urls import path
from .views import MatchDetailsListView, MatchDetailsDetailView


# /api/oceans/:id

urlpatterns = [
    path('', MatchDetailsListView.as_view()),
    path('<int:pk>/', MatchDetailsDetailView.as_view())
]
