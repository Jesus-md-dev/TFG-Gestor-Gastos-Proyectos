from django.http import HttpResponse


def main_page(request):
    return HttpResponse("API MAIN PAGE")