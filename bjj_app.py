import random
'''
BJJ app/website idea: have a list of possible submissions, sweeps, different positions etc that people can add notes to
People can choose what they need to work on, rate success with each sweep submission, keep a diary on each one, make a tally of 
successes with notes on what worked/didnt work

Maybe include total mat time and link it up to clubworx app to include the hours each person booked in for

Could link in the instructors youtube tutorials under notes for certain moves

Make a list of 5 things to work on for the next class for example

A type of forum for members where there are sections with different questions for members

Link with other team members to compare notes/mat times etc

Dropdown with positions, more dropdowns for submissions, escapes, sweeps - think about classifications
'''
bjj_submissions = []
bjj_submissions.append('Collar Choke')
bjj_submissions.append('RNC')
bjj_submissions.append('Arm Bar')
bjj_submissions.append('Triangle Choke')

submission_counters = {}
for submissions in bjj_submissions:
    submission_counters[submissions] = 0

victories = 50
submission_method = []
while len(submission_method) < victories:
    submission_index = int(random.random() * len(bjj_submissions))
    submission = bjj_submissions[submission_index]
    submission_counters[submission] = submission_counters[submission] + 1
    submission_method.append(submission)

print(submission_counters)

submission_used = input('Submission used: ')
opponent = input('Opponent submitted:')
if submission_used == 'Wrist lock':
    print("Error: submission not found")
else:
    print('You successfully applied ' + submission_used + ' against ' + opponent)

