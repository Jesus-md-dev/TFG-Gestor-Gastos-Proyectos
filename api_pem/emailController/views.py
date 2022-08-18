from datetime import datetime

from django.conf import settings
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def send_email(request):
    try:
        send_mail(
            'From: ' + request.data['email'],
            request.data['message'],
            settings.DEFAULT_FROM_EMAIL,
            [request.data['toemail']],
            fail_silently=False,
        )
        return Response({"succed": "Email Sended"})
    except Exception as e:
        with open('debug.log', 'a') as f:
            f.write("\n[\""+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+"\"]"+" Request: "+request.path+" Error: "+str(e)+"\n")
 
        return Response({'message': 'bad request'}, status=400)
    