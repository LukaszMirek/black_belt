from django.views import View
from django.views.generic.edit import FormView, CreateView, DeleteView, UpdateView
from django.views.generic.list import ListView
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import LoginForm
from .models import Group, Student


class LoginView(View):
    def get(self, request):
        form = LoginForm()
        return render(request, "base.html", {"form": form})

    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            # user = authenticate(**form.cleaned_data)

            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect("main")
        return render(request, "base.html", {"form": form})


class LogoutView(View):
    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
            return redirect("login")


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "main.html")


class GroupAddView(LoginRequiredMixin, CreateView):
    template_name = "group_add_form.html"
    model = Group
    fields = "__all__"
    success_url = reverse_lazy("groups")


class GroupsView(LoginRequiredMixin, View):
    def get(self, request):
        groups = Group.objects.all()
        return render(request, "groups.html", {"groups": groups})


class StudentAddView(LoginRequiredMixin, CreateView):
    template_name = "student_add_form.html"
    model = Student
    fields = "__all__"
    success_url = reverse_lazy("students")


class StudentsView(LoginRequiredMixin, View):
    def get(self, request):
        students = Student.objects.all()
        return render(request, "students.html", {"students": students})


class StudentEditView(LoginRequiredMixin, UpdateView):
    model = Student
    fields = "__all__"
    template_name = "student_edit_form.html"
    success_url = reverse_lazy("students")


class GroupEditView(LoginRequiredMixin, UpdateView):
    model = Group
    fields = "__all__"
    template_name = "group_edit_form.html"
    success_url = reverse_lazy("groups")