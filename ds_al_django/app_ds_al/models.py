from django.db import models


# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=32)
    password = models.CharField(max_length=64)


class notes(models.Model):
    title = models.CharField(verbose_name="标题", max_length=32)
    content = models.CharField(verbose_name="内容", max_length=64)
    user = models.CharField(verbose_name="用户", max_length=32)
