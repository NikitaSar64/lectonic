from django.urls import path

from workroomsapp.lecture.lecture_views import *
from workroomsapp.lecturer.lecturer_views import *
from workroomsapp.customer.customer_views import *
from workroomsapp.person.person_views import *


urlpatterns = [
    path('profile/', PersonAPIView.as_view(), name='profile'),
    path('profile/document_photos/', DocumentImageAPIVIew.as_view(), name='document_images'),
    path('city/', CityGetAPIView.as_view(), name='city'),
    path('domain/', DomainGetAPIView.as_view(), name='domain'),

    path('lecture/', LectureAPIView.as_view(), name='lecture'),

    path('lecturer/', LecturerCreateAPIView.as_view(), name='lecturer'),
    path('lecturer/diploma_photos/', DiplomaImageAPIView.as_view(), name='diploma_images'),

    path('customer/', CustomerAPIView.as_view(), name='customer'),
]
