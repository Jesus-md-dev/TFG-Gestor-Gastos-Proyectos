from datetime import date

from django.contrib.auth.models import User
from django.test import TestCase
from projects.models import Project
from rest_framework import status
from rest_framework.test import APIClient

from incomes.models import Income


class IncomeTestCase(TestCase):
    def setUp(self):
        user = User(
            email='testUserDjango@mail.com',
            first_name='test',
            last_name='user',
            username='testUser'
        )
        user.set_password('TestPassword123')
        user.save()

        project = Project(
            name = "testProject",
            category = "testCategory",
            admin = user
        )
        project.save()
        self.project_id = project.id

        income = Income(
            project = project,
            date = date(2022, 6, 17),
            concept = "concept",
            amount = 20,
        )
        income.save()
        self.income_id = income.id

    def test_create_income(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/create_income/',
            {
                'project_id': self.project_id,
                'date': date(2022, 6, 17),
                'concept': "concept",
                'amount': 20,
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('income_info', response.data)
        self.assertEqual(response.data['income_info']['project'], self.project_id)
        self.assertEqual(response.data['income_info']['date'], str(date(2022, 6, 17)))
        self.assertEqual(response.data['income_info']['concept'], "concept")
        self.assertEqual(response.data['income_info']['amount'], 20)
    
    def test_read_income(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/income/'+str(self.income_id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('income_info', response.data)
        self.assertEqual(response.data['income_info']['project'], self.project_id)
        self.assertEqual(response.data['income_info']['date'], str(date(2022, 6, 17)))
        self.assertEqual(response.data['income_info']['concept'], "concept")
        self.assertEqual(response.data['income_info']['amount'], 20)

    def test_update_income(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.put('/api/update_income/',
            {
                'id': self.income_id,
                'date': date(2022, 6, 18),
                'concept': "updatedconcept",
                'amount': 30,
            }
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('income_info', response.data)
        self.assertEqual(response.data['income_info']['project'], self.project_id)
        self.assertEqual(response.data['income_info']['date'], str(date(2022, 6, 18)))
        self.assertEqual(response.data['income_info']['concept'], "updatedconcept")
        self.assertEqual(response.data['income_info']['amount'], 30)

    def test_delete_income(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.delete('/api/delete_income/'+str(self.income_id))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('income_info', response.data)

    def test_read_project_incomes(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/incomes/'+str(self.project_id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('incomes_info', response.data)
        self.assertEqual(response.data['incomes_info'][0]['project'], self.project_id)
        self.assertEqual(response.data['incomes_info'][0]['date'], str(date(2022, 6, 17)))
        self.assertEqual(response.data['incomes_info'][0]['concept'], "concept")
        self.assertEqual(response.data['incomes_info'][0]['amount'], 20)
