from django.db import models

BELT_SYSTEM = (
    (1, "BIAŁY"),
    (2, "BIAŁY 1"),
    (3, "BIAŁY 2"),
    (4, "BIAŁY 3"),
    (5, "BIAŁY 4"),
    (6, "NIEBIECKI"),
    (7, "NIEBIESKI 1"),
    (8, "NIEBIESKI 2"),
    (9, "NIEBIESKI 3"),
    (10, "NIEBIESKI 4"),
    (11, "PURPUROWY"),
    (12, "PURPUROWY 1"),
    (13, "PURPUROWY 2"),
    (14, "PURPUROWY 3"),
    (15, "PURPUROWY 4"),
    (16, "BRĄZOWY"),
    (17, "BRĄZOWY 1"),
    (18, "BRĄZOWY 2"),
    (19, "BRĄZOWY 3"),
    (20, "BRĄZOWY 4"),
    (21, "CZARNY"),
)


class Group(models.Model):
    name = models.CharField(max_length=64, unique=True, verbose_name="Nazwa grupy")
    trainer = models.CharField(max_length=64, verbose_name="Trener")

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=64, unique=True, verbose_name="Imię i nazwisko")
    phone = models.IntegerField(verbose_name="Telefon")
    email = models.EmailField(verbose_name="e-mail")
    groups = models.ManyToManyField(Group)
    notes = models.TextField(verbose_name="Adnotacje")
    belt = models.IntegerField(
        choices=BELT_SYSTEM, default=1, max_length=64, verbose_name="Pas"
    )

    def __str__(self):
        return self.name


# class StudentBelt(models.Model):
#     belt = models.CharField(
#         choices=BELT_SYSTEM, default=1, max_length=64, verbose_name="Pas"
#     )
#     student = models.ForeignKey(Student, on_delete=models.CASCADE)
#     promotion_date = models.DateTimeField(auto_now=True, verbose_name="Data otrzymania")


class PresenceList(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="Uczeń")
    day = models.DateField(verbose_name="Data")
    present = models.BooleanField(null=True, verbose_name="obecny")


class Payments(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    month = models.DateField(verbose_name="Miesiąc")
