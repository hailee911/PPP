from django.urls import path,include
from . import views

app_name = "main"
urlpatterns = [
    path('', views.landing,name="landing"),
    path('index/', views.main,name="main"),
    path('logout/', views.logout,name="logout"),
    path('search/', views.search,name="search"),
    path('happy_data/', views.happy_data,name="happy_data"),
]
