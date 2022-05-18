from django.urls import reverse
from rest_framework.test import APITestCase

from authapp.tests.base import BaseSignUpTestCase
from speakers.utils.tests import data
from workroomsapp.models import City


class SignUpTestCase(BaseSignUpTestCase):
    """ Базовый класс для тестирования, в котором создается пользователь """

    def setUp(self):
        super().setUp()
        temp_signup_data = self.signup_data.copy()
        self.client.post(reverse('signup'), temp_signup_data)

    def test_credentials(self):
        """ Метод для проверки прав неавторизованного пользователя """

        self.client.get(reverse('logout'))

        # Тут у классов-наследников должен быть код, который проверяет права доступа к API
        # у неавторизованных пользователей


class PersonCreateTestCase(SignUpTestCase):
    """ Базовый класс для тестирования, в котором создается профиль пользователя """

    profile_data = data.PROFILE.copy()

    def setUp(self):
        super().setUp()
        self.profile_data['city'] = '1'
        City.objects.get_or_create(name='Москва', pk=1)
        temp_data = self.profile_data.copy()
        self.client.post(reverse('profile'), temp_data)
