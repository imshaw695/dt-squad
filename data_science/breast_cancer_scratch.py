import cv2 as cv
import numpy as np
from sklearn.model_selection import train_test_split
import tensorflow as tf
from keras.layers import Dense
import os

this_directory = os.path.abspath(os.path.dirname(__file__))
# Importing the dataset
path_to_data = os.path.join(this_directory,'breast-cancer.csv')

with open(path_to_data) as file:  # open supplied txt file of words
    data_01 = file.read()  # read it # split down into a list separating each line

data_02 = data_01.split('\n')

data_03 = []
for line_index,line in enumerate(data_02):
    if line_index == 0:
        headings = line.split(',') 
        continue
    line = line.split(',')
    for index,item in enumerate(line):
        item = item.replace('"','')
        line[index] = item

    data_03.append(line)

unique_variables = []
for line_index,line in enumerate(data_03):
    for column_index,column in enumerate(line):
        if line_index == 0:
            unique_variables.append([])
        if not column in unique_variables[column_index]:
            unique_variables[column_index].append(column)

non_categoricals = [0,2,3,5]
heading_02 = []
for non_categorical in non_categoricals:
    new_heading = headings[non_categorical]
    heading_02.append(new_heading)

for index,attribute in enumerate(unique_variables):
    for category in attribute:
        new_heading = f'{headings[index]}-{category}'
        heading_02.append(new_heading)

number_of_zeros = 0
for list in unique_variables:
    number_of_zeros = number_of_zeros + len(list)

data_04 = []
non_categorical_maximums = [0] * len(non_categoricals)
for line in data_03:
    # create a row with the correct number of zeros
    output_line = [0] * (number_of_zeros+len(non_categoricals))
    offset = len(non_categoricals)
    non_categorical_offset = 0
    for column_index,column in enumerate(line):
        if column_index in non_categoricals:
            pass
            if '-' in column:
                low,high = column.split('-')
                number = (int(low) + int(high))/2
            else:
                number = int(column)
            output_line[non_categorical_offset] = number
            non_categorical_maximums[non_categorical_offset] = max(number,non_categorical_maximums[non_categorical_offset])
            non_categorical_offset = non_categorical_offset + 1
        # for this column, find out which zero needs setting
        found_at = unique_variables[column_index].index(column)
        flip_index = offset + found_at
        output_line[flip_index] = 1
        offset = len(unique_variables[column_index]) + offset
    data_04.append(output_line)

for line in data_04:
    for index,item in enumerate(line):
        if index < len(non_categoricals):
            normalized = item/non_categorical_maximums[index]
            line[index] = normalized

even_dataset_nonrecurrence = []
even_dataset_recurrence = []
unused_nonrecurrence = []

for observation in data_04:
    if observation[-2] == 1:
        even_dataset_recurrence.append(observation)
    if observation[-1] == 1: 
        if len(even_dataset_nonrecurrence) < 85:
            even_dataset_nonrecurrence.append(observation)
        else:
            unused_nonrecurrence.append(observation)

even_dataset = even_dataset_nonrecurrence + even_dataset_recurrence

data_05 = np.array(even_dataset)
unused_nonrecurrence_np = np.array(unused_nonrecurrence)
# data_05[:, 31] = data_05[:, -2]
data_05[:, 31] = 0
# data_05[:, 32] = data_05[:, -1]
data_05[:, 32] = 0
data_05[:, 33] = 0

# unused_nonrecurrence_np[:, 31] = unused_nonrecurrence_np[:, -2]
unused_nonrecurrence_np[:, 31] = 0
# unused_nonrecurrence_np[:, 32] = unused_nonrecurrence_np[:, -1]
unused_nonrecurrence_np[:, 32] = 0
unused_nonrecurrence_np[:, 33] = 0

ways = [True,False]

model_metrics_new_way = []
model_metrics_old_way = []

for way in ways:
    new_way = way
    if not new_way:
        data_05 = data_05[:, len(non_categoricals):]
        unused_nonrecurrence_np = unused_nonrecurrence_np[:, len(non_categoricals):]

    number_of_runs = 1
    for run_index in range(number_of_runs):
        # Before splitting into inputs and outputs, I need to get 85 recurrence and 85 non-recurrence into a new dataset to split into 
        # test and training sets. I then need to add the unused non-recurrence lines to the test set.
        # I know that non-recurrence lines will have the last value as 1

        # tab in below here and set up the for loop to test 100 times

        X = data_05[:, :-2]
        y = data_05[:, -2:]
        X_unused = unused_nonrecurrence_np[:, :-2]
        y_unused = unused_nonrecurrence_np[:, -2:]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

        X_test = np.concatenate((X_test, X_unused))
        y_test = np.concatenate((y_test, y_unused))
        number_of_input_nodes = X.shape[1]
        model = tf.keras.models.Sequential()
        model.add(Dense(20, input_shape=(number_of_input_nodes,), activation="relu"))

        

        if True:
            
            # This creates a hidden layer and sets the amount of neurons, 30, and the activation function, which is relu
            # model.add(tf.keras.layers.Dense(units=100, activation=tf.nn.relu))

            # Finally, you create the output layer. softmax scales them down so that they add up to 1
            model.add(tf.keras.layers.Dense(units=2, activation=tf.nn.softmax))

            # It didn't like the cross entropy form of loss, changing it to mean squared error worked!
            model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

            history = model.fit(X_train, y_train, epochs=15)
            model_accuracy = history.history['accuracy'][-1]
            model_loss = history.history['loss'][-1]
            print('Now for the test results:')
            loss, accuracy = model.evaluate(X_test, y_test)
            if new_way:
                model_metrics_new_way.append([model_accuracy, model_loss, loss, accuracy])
            else:
                model_metrics_old_way.append([model_accuracy, model_loss, loss, accuracy])

            print(accuracy)
            print()
            print(loss)
            
            for layer in model.layers:
                print(layer.output_shape)

            print(model.get_weights())
            variable_index = 0
            weights = model.get_weights()
            for index,array in enumerate(weights):
                if index == 0:
                    for input_node in array:
                        sum_of_weights = 0  
                        for weight in input_node:
                            sum_of_weights = sum_of_weights + abs(weight)
                        print(f'Variable number {variable_index} - {heading_02[variable_index]} has {data_05[:, variable_index].sum()} has an importance of {sum_of_weights}.')
                        variable_index = variable_index + 1
                else:
                    continue


            model.save("breast_cancer.model")

for layer in model.layers:
    print(layer.output_shape)

print()

print(model_metrics_old_way)
print(model_metrics_new_way)


model_accuracy_new = []
model_accuracy_old = []
accuracy_new = []
accuracy_old = []


for run in model_metrics_old_way:
    for index,metric in enumerate(run):
        if index == 0:
            model_accuracy_old.append(metric)
        elif index == 3:
            accuracy_old.append(metric)
        else:
            continue

for run in model_metrics_new_way:
    for index,metric in enumerate(run):
        if index == 0:
            model_accuracy_new.append(metric)
        elif index == 3:
            accuracy_new.append(metric)
        else:
            continue


model_accuracy_old_mean = sum(model_accuracy_old)/len(model_accuracy_old)
accuracy_old_mean = sum(accuracy_old)/len(accuracy_old)
model_accuracy_new_mean = sum(model_accuracy_new)/len(model_accuracy_new)
accuracy_new_mean = sum(accuracy_new)/len(accuracy_new)

print(f'The mean of the model accuracy for the old method is: {model_accuracy_old_mean}')
print(f'The mean of the accuracy for the old method is: {accuracy_old_mean}')
print(f'The mean of the model accuracy for the new method is: {model_accuracy_new_mean}')
print(f'The mean of the accuracy for the new method is: {accuracy_new_mean}')

1/0