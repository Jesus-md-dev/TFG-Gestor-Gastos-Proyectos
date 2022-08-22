import datetime
import random

import requests

# DATA 

exec(open('delete_data.py').read())

porject_id = 25
n_users = 20
n_incomes = 51
n_expenses = 201

response = requests.post('http://13.37.212.41/api/login/',
    {
        'username': 'TestAdministrador',
        'password': 'TestAdministrador123'
    }
)
if response.status_code == 200:
    token = response.json()['token']

start_date = datetime.date(2020, 1, 1)
end_date = datetime.date.today()

time_between_dates = end_date - start_date
days_between_dates = time_between_dates.days

# GENERATE USERS
usernames = []

for i in range(1,n_users):
    r=requests.post('http://13.37.212.41/api/register/',
            {
                'email': 'UserTest'+str(i)+'@mail.com',
                'password': 'TestPassword12345',
                'first_name': 'UserTest'+str(i),
                'last_name': 'UserTest'+str(i),
                'username': 'UserTest'+str(i)
            }
        )
    if r.status_code == 200:
        print("User "+'UserTest'+str(i)+" created")
    usernames.append('UserTest'+str(i))

for username in usernames:
    response = requests.post('http://13.37.212.41/api/add_member_project/',
            {
                'project_id': porject_id,
                'usernames': username,
            }, 
            headers={'Authorization': 'Token '+token}
        )
    if r.status_code == 200:
        print("User "+username+" added to project")

response = requests.get('http://13.37.212.41/api/project_members/'+str(porject_id),
    headers={'Authorization': 'Token '+token})

usernames = []
usernames.append('TestAdministrador')
for user in response.json()['members_info']:
    usernames.append(user['username'])

# GENERATE EXPENSES
expenses = []
concepts = ['Equipo informático', 'Escritorios oficina', 'Sillas', 'Mobiliario']

for i in range(1,n_expenses):
    random_number_of_days = random.randrange(days_between_dates)
    exp_date = start_date + datetime.timedelta(days=random_number_of_days)
    expenses.append({
                'project_id': porject_id,
                'username': usernames[random.randrange(0, len(usernames))],
                'date': exp_date,
                'concept': concepts[random.randrange(0, len(concepts))],
                'amount': random.randrange(50, 501),
                'vatpercentage': random.randrange(16, 22)
            })

for expense in expenses:
    r=requests.post('http://13.37.212.41/api/create_expense/', expense, 
        headers={'Authorization': 'Token '+token})
    if r.status_code == 200:
        print("Expense created")

# GENERATE INCOMES
incomes = []
concepts = ['Ingresos ventas', 'Subvenciones']

for i in range(1,n_incomes):
    random_number_of_days = random.randrange(days_between_dates)
    exp_date = start_date + datetime.timedelta(days=random_number_of_days)
    incomes.append({
                'project_id': porject_id,
                'date': exp_date,
                'concept': concepts[random.randrange(0, len(concepts))],
                'amount': random.randrange(1000, 1500),
            })

for income in incomes:
    r=requests.post('http://13.37.212.41/api/create_income/', income, 
        headers={'Authorization': 'Token '+token})
    if r.status_code == 200:
        print("Income created")
