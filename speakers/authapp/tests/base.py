from rest_framework.test import APITestCase

from emailapp.models import EmailConfirmation
from speakers.utils.tests import data


class BaseSignUpTestCase(APITestCase):
    """ Базовый класс для тестирования, в котором создается пользователь """

    signup_data = data.SIGNUP.copy()
    signup_data2 = data.SIGNUP2.copy()

    def setUp(self):
        EmailConfirmation.objects.get_or_create(email=self.signup_data['email'], confirmed=True)
        EmailConfirmation.objects.get_or_create(email=self.signup_data2['email'], confirmed=True)

