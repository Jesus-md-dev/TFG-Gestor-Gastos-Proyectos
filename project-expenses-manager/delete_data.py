import requests

porject_id = 25
n_users = 20

# DELETE USERS

for i in range(1,n_users):
    response = requests.post('http://13.37.212.41/api/login/',
        {
            'username': 'UserTest'+str(i),
            'password': 'TestPassword12345'
        }
    )

    if response.status_code == 200:
        token = response.json()['token']
        r = requests.delete('http://13.37.212.41/api/delete_user/'+'UserTest'+str(i),
            headers={'Authorization': 'Token '+token})
        if r.status_code == 200:
            print("User "+'UserTest'+str(i)+" deleted")

response = requests.post('http://13.37.212.41/api/login/',
    {
        'username': 'TestAdministrador',
        'password': 'TestAdministrador123'
    }
)

if response.status_code == 200:
    token = response.json()['token']
    
    # DELETE INCOMES

    response = requests.get('http://13.37.212.41/api/incomes/'+str(porject_id),
        headers={'Authorization': 'Token '+token})
    if response.status_code == 200:
        for income in response.json()['incomes_info']:
            r = requests.delete('http://13.37.212.41/api/delete_income/'+str(income['id']),
                headers={'Authorization': 'Token '+token})
            if r.status_code == 200:
                print("Income deleted")

    # DELETE EXPENSES

    response = requests.get('http://13.37.212.41/api/expenses/'+str(porject_id),
        headers={'Authorization': 'Token '+token})
    if response.status_code == 200:
        for income in response.json()['expenses_info']:
            r = requests.delete('http://13.37.212.41/api/delete_expense/'+str(income['id']),
                headers={'Authorization': 'Token '+token})
            if r.status_code == 200:
                print("Expense deleted")
