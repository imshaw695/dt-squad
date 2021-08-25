import random

'''
myDict = {'Peter':['Male', 'Blonde','Green'], 'Ivan':['Male','Brown','Blue']}
print(myDict['Peter'][1])

print(int(1.1 + 2.9))

print(3 == 2)

print(list('hello world'))

for letters in 'hello world':
    print(letters)

x = 12

while x > 5 and x < 20:
    print(f'x is equal to {x}')
    x = x + 1
else:
    print('x is no more')

team_members = []

team_members.append('Bob')
team_members.append('Marley')
team_members.append('Fred')

team_counters = {}
for team_member in team_members:
    team_counters[team_member] = 0

team_counters['Mandy'] = 7
print(team_counters)


for team_member in team_counters:
    print(f'{team_member} has been selected {team_counters[team_member]} times')
'''



bjj_submissions = []
bjj_submissions.append('Collar Choke')
bjj_submissions.append('RNC')
bjj_submissions.append('Arm Bar')
bjj_submissions.append('Triangle Choke')

submission_counters = {}
for submissions in bjj_submissions:
    submission_counters[submissions] = 0

print(submission_counters)

victories = 50
submission_method = []
while len(submission_method) < victories:
    submission_index = int(random.random() * len(bjj_submissions))
    submission = bjj_submissions[submission_index]
    submission_counters[submission] = submission_counters[submission] + 1
    submission_method.append(submission)
    print(submission)

print(submission_counters)

string = "hello"

string = list(string)

string[3] = 4

print(string)

if 'j' in string:
    print('yes')
else: 
    print('no')