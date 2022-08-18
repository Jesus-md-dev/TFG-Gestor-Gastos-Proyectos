from datetime import date

from django.contrib.auth.models import User
from django.test import TestCase
from projects.models import Project
from rest_framework import status
from rest_framework.test import APIClient

from expenses.models import Expense


class ExpenseTestCase(TestCase):
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

        expense = Expense(
            project = project,
            user = user,
            date = date(2022, 6, 17),
            concept = "concept",
            amount = 20,
            vatpercentage = 10,
            final_amount = 22
        )
        expense.save()
        self.expense_id = expense.id

    def test_create_expense(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/create_expense/',
            {
                'project_id': self.project_id,
                'username': 'testUser',
                'date': date(2022, 6, 17),
                'concept': "concept",
                'amount': 20,
                'vatpercentage': 10
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expense_info', response.data)
        self.assertEqual(response.data['expense_info']['project'], self.project_id)
        self.assertEqual(response.data['expense_info']['user'], "testUser")
        self.assertEqual(response.data['expense_info']['date'], str(date(2022, 6, 17)))
        self.assertEqual(response.data['expense_info']['concept'], "concept")
        self.assertEqual(response.data['expense_info']['amount'], 20)
        self.assertEqual(response.data['expense_info']['vatpercentage'], 10)
        self.assertEqual(response.data['expense_info']['final_amount'], 22)
    
    def test_read_expense(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/expense/'+str(self.expense_id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expense_info', response.data)
        self.assertEqual(response.data['expense_info']['project'], self.project_id)
        self.assertEqual(response.data['expense_info']['user'], "testUser")
        self.assertEqual(response.data['expense_info']['date'], str(date(2022, 6, 17)))
        self.assertEqual(response.data['expense_info']['concept'], "concept")
        self.assertEqual(response.data['expense_info']['amount'], 20)
        self.assertEqual(response.data['expense_info']['vatpercentage'], 10)
        self.assertEqual(response.data['expense_info']['final_amount'], 22)

    def test_update_expense(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.put('/api/update_expense/',
            {
                'id': self.expense_id,
                'username': "UserTestA",
                'date': date(2022, 6, 18),
                'concept': "updatedconcept",
                'amount': 30,
                'vatpercentage': 20
            }
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expense_info', response.data)
        self.assertEqual(response.data['expense_info']['project'], self.project_id)
        self.assertEqual(response.data['expense_info']['user'], "UserTestA")
        self.assertEqual(response.data['expense_info']['date'], str(date(2022, 6, 18)))
        self.assertEqual(response.data['expense_info']['concept'], "updatedconcept")
        self.assertEqual(response.data['expense_info']['amount'], 30)
        self.assertEqual(response.data['expense_info']['vatpercentage'], 20)
        self.assertEqual(response.data['expense_info']['final_amount'], 36)

    def test_delete_expense(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.delete('/api/delete_expense/'+str(self.expense_id))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expense_info', response.data)

    def test_read_project_expenses(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/expenses/'+str(self.project_id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expenses_info', response.data)
        self.assertEqual(response.data['expenses_info'][0]['project'], self.project_id)
        self.assertEqual(response.data['expenses_info'][0]['user'], "testUser")
        self.assertEqual(response.data['expenses_info'][0]['date'], str(date(2022, 6, 17)))
        self.assertEqual(response.data['expenses_info'][0]['concept'], "concept")
        self.assertEqual(response.data['expenses_info'][0]['amount'], 20)
        self.assertEqual(response.data['expenses_info'][0]['vatpercentage'], 10)
        self.assertEqual(response.data['expenses_info'][0]['final_amount'], 22)

    def test_read_user_expenses(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/expenses/'+str(self.project_id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expenses_info', response.data)
        self.assertEqual(response.data['expenses_info'][0]['project'], self.project_id)
        self.assertEqual(response.data['expenses_info'][0]['user'], "testUser")
        self.assertEqual(response.data['expenses_info'][0]['date'], str(date(2022, 6, 17)))
        self.assertEqual(response.data['expenses_info'][0]['concept'], "concept")
        self.assertEqual(response.data['expenses_info'][0]['amount'], 20)
        self.assertEqual(response.data['expenses_info'][0]['vatpercentage'], 10)
        self.assertEqual(response.data['expenses_info'][0]['final_amount'], 22)

    def test_read_user_expenses_project_params(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        project = client.post('/api/create_project/',
        {
            'name': 'testProject2',
            'category': 'testCategory2'
        })

        client.post('/api/create_expense/',
        {
            'project_id': project.data['project_info']['id'],
            'username': 'testUser',
            'date': date(2021, 6, 17),
            'concept': "concept2",
            'amount': 30,
            'vatpercentage': 10
        })

        response = client.get('/api/expenses/', 
        {
            'project_id': project.data['project_info']['id']
        })
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expenses_info', response.data)
        self.assertEqual(response.data['expenses_info'][0]['project'], project.data['project_info']['id'])
        self.assertEqual(response.data['expenses_info'][0]['user'], "testUser")
        self.assertEqual(response.data['expenses_info'][0]['date'], str(date(2021, 6, 17)))
        self.assertEqual(response.data['expenses_info'][0]['concept'], "concept2")
        self.assertEqual(response.data['expenses_info'][0]['amount'], 30)
        self.assertEqual(response.data['expenses_info'][0]['vatpercentage'], 10)
        self.assertEqual(response.data['expenses_info'][0]['final_amount'], 33)

        response = client.get('/api/expenses/', 
        {
            'username': 'testUser'
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('expenses_info', response.data)
        self.assertEqual(len(response.data['expenses_info']), 2)

        client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )

        client.post('/api/create_expense/',
        {
            'project_id': project.data['project_info']['id'],
            'username': 'UserTestA',
            'date': date(2021, 6, 17),
            'concept': "concept2",
            'amount': 30,
            'vatpercentage': 10
        })

        response = client.get('/api/expenses/', 
        {
            'project_id': project.data['project_info']['id'],
            'username': 'UserTestA'
        })

        self.assertIn('expenses_info', response.data)
        self.assertEqual(response.data['expenses_info'][0]['project'], project.data['project_info']['id'])
        self.assertEqual(response.data['expenses_info'][0]['user'], "UserTestA")
        self.assertEqual(response.data['expenses_info'][0]['date'], str(date(2021, 6, 17)))
        self.assertEqual(response.data['expenses_info'][0]['concept'], "concept2")
        self.assertEqual(response.data['expenses_info'][0]['amount'], 30)
        self.assertEqual(response.data['expenses_info'][0]['vatpercentage'], 10)
        self.assertEqual(response.data['expenses_info'][0]['final_amount'], 33)
