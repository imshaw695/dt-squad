import random
name = "Ivan"
print(name)
team_members = ["Peter"]
print(team_members)
team_members.append(name)
print(team_members)
team_members.append('Hector')
team_members.append('Basil')
team_members.append('Dylan')
dogs = ['Hector', 'Basil', 'Dylan']
print(team_members)
for team_member in team_members:
    # if team_member == "Hector" or team_member == "Basil":
    if team_member in dogs:
        message = f'hello {team_member} woof woof'
        print(message)
    else:
        print(f'hello {team_member}')

print(team_members[0])
print(team_members[-1])
number_of_team_members = len(team_members)
print(number_of_team_members)
volunteer_index = int(random.random() * len(team_members))
print(volunteer_index)
volunteer = team_members[volunteer_index]
print(volunteer)
'''
Homework: Learn how to do while loops and create a printed out list showing the volunteers that will be selected for the next 50 missions
Use comments on todays code to remind me how it works etc
'''