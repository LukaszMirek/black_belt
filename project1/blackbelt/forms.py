from django import forms
from django.forms import ModelForm
from .models import Group, Student, PresenceList, Payments


class LoginForm(forms.Form):
    username = forms.CharField(label="Login:")
    password = forms.CharField(label="Hasło:", widget=forms.PasswordInput)


# class PresenceForm(forms.Form):
#     student = forms.ModelChoiceField(
#         queryset=Student.objects.all(),
#         label="Uczeń",
#         widget=forms.CheckboxSelectMultiple,
#     )
#     day = forms.DateField(label="Data", widget=forms.SelectDateWidget)
# present = forms.BooleanField(label="Obecny?", required=False)
class PresenceForm(ModelForm):
    class Meta:
        model = PresenceList
        fields = "__all__"


class StudentForm(ModelForm):
    class Meta:
        model = Student
        fields = "__all__"
