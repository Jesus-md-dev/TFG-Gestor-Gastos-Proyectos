from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class UserTestCase(TestCase):
    def setUp(self):
        user = User(
            email='testUserDjango@mail.com',
            first_name='test',
            last_name='user',
            username='testUser'
        )
        user.set_password('TestPassword123')
        user.save()

    def test_register_user(self):

        client = APIClient()
        response = client.post('/api/register/',
            {
                'email': 'testUserDjango12345@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'test12345',
                'last_name': 'user12345',
                'username': 'testUserDjango12345'
            }
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_info']['username'], "testUserDjango12345")
        self.assertEqual(response.data['user_info']['email'], "testUserDjango12345@mail.com")
        self.assertEqual(response.data['user_info']['first_name'], "test12345")
        self.assertEqual(response.data['user_info']['last_name'], "user12345")
    
    def test_login_user(self):

        client = APIClient()
        response = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user_info']['username'], "testUser")
        self.assertEqual(response.data['user_info']['email'], "testUserDjango@mail.com")
        self.assertEqual(response.data['user_info']['first_name'], "test")
        self.assertEqual(response.data['user_info']['last_name'], "user")
        
    def test_read_user(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/user/testUser')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user_info', response.data)
        self.assertEqual(response.data['user_info']['username'], "testUser")
        self.assertEqual(response.data['user_info']['email'], "testUserDjango@mail.com")
        self.assertEqual(response.data['user_info']['first_name'], "test")
        self.assertEqual(response.data['user_info']['last_name'], "user")

    def test_modify_user(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.put('/api/update_user/',
            {
                'email': 'updated@mail.com',
                'first_name': 'updated',
                'last_name': 'updated',
                'username': 'testUser'
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user_info', response.data)
        self.assertEqual(response.data['user_info']['username'], "testUser")
        self.assertEqual(response.data['user_info']['email'], "updated@mail.com")
        self.assertEqual(response.data['user_info']['first_name'], "updated")
        self.assertEqual(response.data['user_info']['last_name'], "updated")

    def test_delete_user(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.delete('/api/delete_user/testUser')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
