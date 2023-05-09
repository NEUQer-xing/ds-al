from django.http import JsonResponse
from django.shortcuts import render, HttpResponse


# Create your views here.

def home(request):
    return render(request, "test.html")


def login(request):
    if request.method == "GET":
        return render(request, "login.html")
    elif request.method == "POST":
        username = request.POST.get("user")
        password = request.POST.get("password")
        if username == "admin" and password == "123":
            return HttpResponse("登录成功")
        else:
            return render(request, "login.html", {"error_msg": "用户名或密码错误"})


def test(request):
    data = {"title": "test", "content": "test content"}
    return JsonResponse(data)
