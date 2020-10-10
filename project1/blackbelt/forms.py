from django import forms
from .models import Group, Student, StudentBelt, PresenceList, Payments


class LoginForm(forms.Form):
    username = forms.CharField(label="Login:")
    password = forms.CharField(label="Hasło:", widget=forms.PasswordInput)