<<<<<<< HEAD
from django.urls import path,include
from . import views

app_name = "diary"
urlpatterns = [
    path('diaryHome/', views.diaryHome, name="diaryHome"),
    path('MdiaryList/', views.MdiaryList, name="MdiaryList"),
    path('diaryWrite/', views.diaryWrite, name="diaryWrite"),
    path('diaryMake/', views.diaryMake, name="diaryMake"),
    path('diaryView/', views.diaryView, name="diaryView"),
    path('CdiaryList/', views.CdiaryList, name="CdiaryList"), # 생성한 다이어리 리스트
    path('JdiaryList/', views.JdiaryList, name="JdiaryList") # 생성한 다이어리 리스트
]
=======
from django.urls import path,include
from . import views

app_name = "diary"
urlpatterns = [
    path('diaryHome/', views.diaryHome, name="diaryHome"),
    path('MdiaryList/', views.MdiaryList, name="MdiaryList"),
    path('JdiaryList/', views.JdiaryList, name="JdiaryList"),
    path('CdiaryList/', views.CdiaryList, name="CdiaryList"),
    path('diaryWrite/', views.diaryWrite, name="diaryWrite"),
    path('diaryMake/', views.diaryMake, name="diaryMake"),
    path('diaryView/', views.diaryView, name="diaryView"),
    path('update-title/', views.update_diary_title, name='update_diary_title'),
]
>>>>>>> 0224d1acfb885c3d59df586193b7eb004165ba6c
