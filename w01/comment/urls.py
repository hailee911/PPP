from django.urls import path,include
from . import views

app_name = "comment"
urlpatterns = [
    path('add_comment/<int:cno>/', views.add_comment, name='add_comment'),
]
