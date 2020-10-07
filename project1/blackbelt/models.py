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
    name = models.CharField(max_length=64, unique=True)
    trainer = models.CharField(max_length=64)


class Student(models.Model):
    name = models.CharField(max_length=64, unique=True)
    phone = models.IntegerField()
    email = models.EmailField()
    groups = models.ManyToManyField(Group)
    notes = models.TextField()


class StudentBelt(models.Model):
    belt = models.CharField(choices=BELT_SYSTEM, default=1)
    student = models.ForeignKey(Student)
    promotion_date = models.DateTimeField(auto_now=True)


class PresenceList(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    day = models.DateField()
    present = models.BooleanField(null=True)


class Payments(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    month = models.DateField()
    paid = models.BooleanField(default=False)
