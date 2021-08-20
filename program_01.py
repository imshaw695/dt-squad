import random # We needed to import this complex function for it to work in the rest of the code
name = "Ivan"
print(name)
team_members = ["Peter"] # Creating a list and its first entry, Peter
print(team_members)
team_members.append(name) # Adding the variable name which was made Ivan earlier on, to the list
print(team_members)
team_members.append('Hector')
team_members.append('Basil')
team_members.append('Dylan')
dogs = ['Hector', 'Basil', 'Dylan'] # classifying the dogs in the team_members list as dogs by creating a new list
print(team_members)
for team_member in team_members:
    # if team_member == "Hector" or team_member == "Basil": This is the less efficient way of getting a different response for dogs
    if team_member in dogs: # more efficient if else
        message = f'hello {team_member} woof woof' # an f string, which allows you to put variables and more into a string easily
        print(message)
    else:
        print(f'hello {team_member}')

print(team_members[0]) # this will print the first item in a list
print(team_members[-1]) # this will print the last item in a list
number_of_team_members = len(team_members) # the len function counts the amount of items in a given list
print(number_of_team_members) # you can then print out this amount

volunteer_list = []
team_counters = []

for team_member in team_members:
    team_counters.append(0)

number_of_volunteers = 50

while len(volunteer_list) < number_of_volunteers :
    volunteer_index = int(random.random() * len(team_members)) # int will turn a float into an integer by dropping the decimals, it does not round up or down
    volunteer = team_members[volunteer_index]
    team_counters[volunteer_index] = team_counters[volunteer_index] + 1
    volunteer_list.append(volunteer)

print(volunteer_list)
member_index = 0
for team_member in team_members:
    print(f'{team_member} : {team_counters[member_index]}')
    member_index = member_index + 1



# Now solve using a different method

team_counters = {}
for team_member in team_members:
    team_counters[team_member] = 0

number_of_volunteers = 50
volunteer_list = []
while len(volunteer_list) < number_of_volunteers :
    volunteer_index = int(random.random() * len(team_members)) # int will turn a float into an integer by dropping the decimals, it does not round up or down
    volunteer = team_members[volunteer_index]
    team_counters[volunteer] = team_counters[volunteer] + 1
    volunteer_list.append(volunteer)


for team_member in team_counters:
    print(f'team member {team_member} was selected {team_counters[team_member]} times')
'''
Homework: Learn how to do while loops and create a printed out list showing the volunteers that will be selected for the next 50 missions
Use comments on todays code to remind me how it works etc
Thoughts: Create a pool of volunteers that will count from 1-50, some volunteer counter variable that will increase by 1 each time until it reaches 50, then it will stop 
pulling volunteers. Or, make it append to a list of volunteers and get it to stop producing volunteers once len(volunteer_list) == 50?
While the length of this volunteer list is less than 50, we want it to keep producing volunteers via the previous function and adding it to the list. So I need to append this
new volunteer each time to the list, then it needs to check the number of volunteers and repeat until it reaches 50 in length
How do I get it to create a new value for volunteer each time it runs? I just moved volunteer_index and the other parts down into the while loop in order to get it to produce
a new volunteer each time. Deleted print(volunteer_index) and print(volunteer) to make it neater in the terminal.
 look into jHub hangman module, google python input, higher number or correct game (inputs + loops)
'''