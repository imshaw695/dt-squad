import secrets
import os
import json

this_directory = os.path.abspath(os.path.dirname(__file__))
path_to_data = os.path.join(this_directory,'breast-cancer.csv')

# input_variables = {'age':[], 'menopause':[], 'tumor-size':[], 'inv-nodes':[], 'node-caps':[], 'deg-malig':[], 'breast':[], 'breast-quad':[], 'irradiat':[]}

# All I need is to go through the first column row of breast_cancer.xls in order to get the keys I need
# Then I need to go through the each column and check every row for unique values to populate the lists for each key

with open(path_to_data) as file:  # open supplied txt file of words
    data = file.read()  # read it # split down into a list separating each line

data = data.split(',')
input_variables = {}
for category in data[0:9]:
    input_variables[category] = []

with open(path_to_data) as file:  # open supplied txt file of words
    data_01 = file.read()  # read it # split down into a list separating each line

data_02 = data_01.split('\n')

data_03 = []
for line_index,line in enumerate(data_02):
    if line_index == 0:
        continue
    line = line.split(',')
    data_03.append(line)

unique_variables = []

for line_index,line in enumerate(data_03):
    for column_index,column in enumerate(line):
        if line_index == 0:
            unique_variables.append([])
        if not column in unique_variables[column_index]:
            unique_variables[column_index].append(column)

# Now I need to just populate each of the dictionary items with their corresponding list of values from unique_variables
# They have the same index - NEVERMIND, DICTIONARIES DON'T USE INDEXES! 

input_variables['age'] = unique_variables[0]
input_variables['menopause'] = unique_variables[1]
input_variables['tumor-size'] = unique_variables[2]
input_variables['inv-nodes'] = unique_variables[3]
input_variables['node-caps'] = unique_variables[4]
input_variables['deg-malig'] = unique_variables[5]
input_variables['breast'] = unique_variables[6]
input_variables['breast-quad'] = unique_variables[7]
input_variables['irradiat'] = unique_variables[8]

print(input_variables)