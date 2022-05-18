from django.urls import reverse

from authapp.models import User
from authapp.models import Token
from authapp.tests.base import BaseSignUpTestCase
from emailapp.models import EmailConfirmation


class TestSignup(BaseSignUpTestCase):
    def setUp(self):
        super().setUp()

    def test_user_was_created(self):
        data = {'email': 'admin@admin.ru', 'password': '12345678'}

        self.client.post(reverse('signup'), data)
        self.assertEqual(
            User.objects.filter(email=data['email']).exists(), True,
            msg='Пользователь не был создан в базе данных'
        )

    def test_password_was_hashed(self):
        data = {'email': 'admin@admin.ru', 'password': '12345678'}

        self.client.post(reverse('signup'), data)
        self.assertEqual(
            User.objects.get(email=data['email']).check_password(data['password']),
            True,
            msg='Пароль неверно захешировался'
        )

    def test_user_successful_authenticated(self):
        data = {'email': 'admin@admin.ru', 'password': '12345678'}

        self.client.post(reverse('signup'), data)
        user = User.objects.get(email=data['email'])
        self.assertEqual(
            user.is_authenticated, True,
            msg='Пользователь не был авторизован'
        )
        self.assertEqual(
            Token.objects.filter(user=user).exists(), True,
            msg='Токен для пользователя не был создан в базе данных'
        )

    def test_signup_twice(self):
        data = {'email': 'admin@admin.ru', 'password': '12345678'}

        self.client.post(reverse('signup'), data)
        response2 = self.client.post(reverse('signup'), data)
        self.assertEqual(
            response2.status_code, 400,
            msg='Неверный статус ответа при повторном создании пользователя'
        )

    def test_wrong_email(self):
        emails = ['admin@admin.r', 'admin@admin..ru', 'admin@@admin.ru', 'admдin@admin.ru', 'admin@adдmin.ru']
        data = {'email': 'admin@admin.r', 'password': '12345678'}

        for email in emails:
            data['email'] = email
            EmailConfirmation.objects.create(email=email, confirmed=True)
            response = self.client.post(reverse('signup'), data)
            self.assertEqual(
                response.status_code, 400,
                msg='Неверный статус ответа при вводе некорректного эмейла\n'
                    f'Ответ: {response.data}'
            )

        data['email'] = 'admi-n@admin.ru'
        EmailConfirmation.objects.create(email=data['email'], confirmed=True)
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(
            response.status_code, 201,
            msg='Неверный статус ответа при наличии дефиса в эмейле\n'
                f'Ответ: {response.data}'
        )

    def test_wrong_password(self):
        data = {'email': 'admin@admin.ru', 'password': '1234567'}

        response1 = self.client.post(reverse('signup'), data)
        self.assertEqual(
            response1.status_code, 400,
            msg='Неверный статус ответа при вводе слишком короткого пароля'
        )

        data['password'] = '12345678901' * 4

        response2 = self.client.post(reverse('signup'), data)
        self.assertEqual(
            response2.status_code, 400,
            msg='Неверный статус ответа при вводе слишком длинного пароля'
        )

        data['password'] = '1234д5678'

        response3 = self.client.post(reverse('signup'), data)
        self.assertEqual(
            response3.status_code, 400,
            msg='Неверный статус ответа при наличии русских символов в пароле'
        )

    def test_no_body_in_request(self):
        data = {'password': '12345678'}

        response1 = self.client.post(reverse('signup'), data)
        self.assertEqual(
            response1.status_code, 400,
            msg='Неверный статус ответа при отсутствии эмейла в теле запроса'
        )

        data = {'email': 'admin@admin.ru'}

        response2 = self.client.post(reverse('signup'), data)
        self.assertEqual(
            response2.status_code, 400,
            msg='Неверный статус ответа при отсутствии пароля в теле запроса'
        )