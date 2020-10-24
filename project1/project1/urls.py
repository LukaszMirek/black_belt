"""project1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from blackbelt.views import (
    LoginView,
    MainView,
    GroupAddView,
    GroupsView,
    StudentsView,
    StudentAddView,
    StudentEditView,
    LogoutView,
    GroupEditView,
    StudentDetailsView,
    GroupDetailsView,
    PresenceView,
    StudentDeleteView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", LoginView.as_view(), name="login"),
    path("main/", MainView.as_view(), name="main"),
    path("group_add/", GroupAddView.as_view(), name="group-add"),
    path("groups/", GroupsView.as_view(), name="groups"),
    path("students/", StudentsView.as_view(), name="students"),
    path("student_add/", StudentAddView.as_view(), name="student-add"),
    path("student_edit/<pk>", StudentEditView.as_view(), name="student-edit"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("group_edit/<pk>", GroupEditView.as_view(), name="group-edit"),
    path(
        "student_details/<int:student_id>",
        StudentDetailsView.as_view(),
        name="student-details",
    ),
    path(
        "group_details/<int:group_id>", GroupDetailsView.as_view(), name="group-details"
    ),
    path("presence/", PresenceView.as_view(), name="presence"),
    path("student_edit/<pk>", StudentEditView.as_view(), name="student-edit"),
    path("student_delete/<pk>", StudentDeleteView.as_view(), name="student-delete"),
]
