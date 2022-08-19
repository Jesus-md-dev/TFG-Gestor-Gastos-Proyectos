from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from projects.models import Project


class ProjectTestCase(TestCase):
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

    
    def test_create_project(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/create_project/',
            {
                'name': 'testProject',
                'category': 'testCategory'
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('project_info', response.data)
        self.assertEqual(response.data['project_info']['name'], "testProject")
        self.assertEqual(response.data['project_info']['category'], "testCategory")
        self.assertEqual(response.data['project_info']['admin'], "testUser")

    def test_read_project(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/project/'+str(self.project_id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('project_info', response.data)
        self.assertEqual(response.data['project_info']['name'], "testProject")
        self.assertEqual(response.data['project_info']['category'], "testCategory")
        self.assertEqual(response.data['project_info']['admin'], "testUser")

    def test_modify_project(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.put('/api/update_project/',
            {
                'id': self.project_id,
                'name': 'updatedProject',
                'category': 'updatedCategory'
            }
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('project_info', response.data)
        self.assertEqual(response.data['project_info']['name'], "updatedProject")
        self.assertEqual(response.data['project_info']['category'], "updatedCategory")
        self.assertEqual(response.data['project_info']['admin'], "testUser")
    
    def test_delete_project(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.delete('/api/delete_project/'+str(self.project_id),
            {
                'id': self.project_id,
                'name': 'updatedProject',
                'category': 'updatedCategory'
            }
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_projects(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.get('/api/projects/testUser')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('projects_info', response.data)
        self.assertEqual(len(response.data['projects_info']), 1)
        self.assertEqual(response.data['projects_info'][0]['name'], "testProject")
        self.assertEqual(response.data['projects_info'][0]['category'], "testCategory")
        self.assertEqual(response.data['projects_info'][0]['admin'], "testUser")

    def test_add_member_project(self):

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

        client.post('/api/register/',
            {
                'email': 'UserTestB@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestB',
                'last_name': 'UserTestB',
                'username': 'UserTestB'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA', 'UserTestB']},
            },
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('project_member_info', response.data)
        self.assertEqual(len(response.data['project_member_info']), 2)
        self.assertEqual(response.data['project_member_info'][0]['project'], self.project_id)
        self.assertEqual(response.data['project_member_info'][0]['user'], "UserTestA")
        self.assertFalse(response.data['project_member_info'][0]['is_manager'])
        self.assertEqual(response.data['project_member_info'][1]['project'], self.project_id)
        self.assertEqual(response.data['project_member_info'][1]['user'], "UserTestB")
        self.assertFalse(response.data['project_member_info'][1]['is_manager'])

    def test_member_projects(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        token2 = client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA']},
            },
            format='json'
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token2.data['token'])
        response = client.get('/api/member_projects/UserTestA')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('projects_info', response.data)
        self.assertEqual(len(response.data['projects_info']), 1)
        self.assertEqual(response.data['projects_info'][0]['name'], "testProject")
        self.assertEqual(response.data['projects_info'][0]['category'], "testCategory")
        self.assertEqual(response.data['projects_info'][0]['admin'], "testUser")

    def test_project_members(self):

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
        response = client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA']},
            },
            format='json'
        )

        response = client.get('/api/project_members/'+str(self.project_id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('members_info', response.data)
        self.assertEqual(len(response.data['members_info']), 1)
        self.assertEqual(response.data['members_info'][0]['username'], "UserTestA")
        self.assertEqual(response.data['members_info'][0]['email'], "UserTestA@mail.com")
        self.assertEqual(response.data['members_info'][0]['first_name'], "UserTestA")
        self.assertEqual(response.data['members_info'][0]['last_name'], "UserTestA")

    def test_delete_project_member(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        user = client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA']},
            },
            format='json'
        )

        response = client.delete('/api/delete_project_member/', {
                'project_id': self.project_id,
                'member_id': user.data['user_info']['id'],
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('project_member_info', response.data)

    def test_promote_project_member(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        user = client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA']},
            },
            format='json'
        )

        response = client.put('/api/promote_project_member/', {
                'project_id': self.project_id,
                'username': user.data['user_info']['username'],
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('project_member_info', response.data)
        self.assertEqual(response.data['project_member_info']['project'], self.project_id)
        self.assertEqual(response.data['project_member_info']['user'], "UserTestA")
        self.assertTrue(response.data['project_member_info']['is_manager'])

    def test_demote_project_member(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        user = client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        response = client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA']},
            },
            format='json'
        )

        response = client.put('/api/promote_project_member/', {
                'project_id': self.project_id,
                'username': user.data['user_info']['username'],
            })

        self.assertTrue(response.data['project_member_info']['is_manager'])

        response = client.put('/api/demote_project_member/', {
                'project_id': self.project_id,
                'username': user.data['user_info']['username'],
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('project_member_info', response.data)
        self.assertEqual(response.data['project_member_info']['project'], self.project_id)
        self.assertEqual(response.data['project_member_info']['user'], "UserTestA")
        self.assertFalse(response.data['project_member_info']['is_manager'])

    def test_managed_projects(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        user = client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA']},
            },
            format='json'
        )

        client.put('/api/promote_project_member/', {
            'project_id': self.project_id,
            'username': user.data['user_info']['username'],
        })

  
        client.credentials(HTTP_AUTHORIZATION='Token ' + user.data['token'])
        response = client.get('/api/managed_projects/UserTestA')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('projects_info', response.data)
        self.assertEqual(response.data['projects_info'][0]['name'], "testProject")
        self.assertEqual(response.data['projects_info'][0]['category'], "testCategory")
        self.assertEqual(response.data['projects_info'][0]['admin'], "testUser")

    def test_is_manager(self):

        client = APIClient()
        token = client.post('/api/login/',
            {
                'password': 'TestPassword123',
                'username': 'testUser'
            }
        )

        user = client.post('/api/register/',
            {
                'email': 'UserTestA@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTestA',
                'last_name': 'UserTestA',
                'username': 'UserTestA'
            }
        )
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        client.post('/api/add_member_project/',
            {
                'project_id': self.project_id,
                'usernames': {'usernames': ['UserTestA']},
            },
            format='json'
        )
        client.credentials(HTTP_AUTHORIZATION='Token ' + user.data['token'])
        response = client.get('/api/is_manager/'+str(self.project_id))
        self.assertIn('is_manager', response.data)
        self.assertFalse(response.data['is_manager'])

        client.credentials(HTTP_AUTHORIZATION='Token ' + token.data['token'])
        client.put('/api/promote_project_member/', {
            'project_id': self.project_id,
            'username': user.data['user_info']['username'],
        })

        client.credentials(HTTP_AUTHORIZATION='Token ' + user.data['token'])
        response = client.get('/api/is_manager/'+str(self.project_id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('is_manager', response.data)
        self.assertTrue(response.data['is_manager'])
