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

number_of_zeros = 0
for list in unique_variables:
    number_of_zeros = number_of_zeros + len(list)

data_04 = []
for line in data_03:
    # create a row with the correct number of zeros
    output_line = [0] * number_of_zeros
    offset = 0
    for column_index,column in enumerate(line):
        # for this column, find out which zero needs setting
        found_at = unique_variables[column_index].index(column)
        flip_index = offset + found_at
        output_line[flip_index] = 1
        offset = len(unique_variables[column_index]) + offset
    data_04.append(output_line)

even_dataset = []
unused_nonrecurrence = []
count = 0
for observation in data_04:
    if observation[-2] == 1:
        even_dataset.append(observation)
    if observation[-1] == 1 and count < 85:
        even_dataset.append(observation)
        count = count + 1
    if observation[-1] == 1 and count >= 85:
        unused_nonrecurrence.append(observation)

data_05 = np.array(even_dataset)
unused_nonrecurrence_np = np.array(unused_nonrecurrence)
# Before splitting into inputs and outputs, I need to get 85 recurrence and 85 non-recurrence into a new dataset to split into 
# test and training sets. I then need to add the unused non-recurrence lines to the test set.
# I know that non-recurrence lines will have the last value as 1
X = data_05[:, :-2]
y = data_05[:, -2:]
X_unused = unused_nonrecurrence_np[:, :-2]
y_unused = unused_nonrecurrence_np[:, -2:]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

X_test = np.concatenate((X_train, X_unused))
y_test = np.concatenate((y_train, y_unused))

model = tf.keras.models.Sequential()
model.add(Dense(8, input_shape=(43,), activation="relu"))

if True:
   
    # This creates a hidden layer and sets the amount of neurons, 30, and the activation function, which is relu
    model.add(tf.keras.layers.Dense(units=100, activation=tf.nn.relu))

    # Finally, you create the output layer. softmax scales them down so that they add up to 1
    model.add(tf.keras.layers.Dense(units=2, activation=tf.nn.softmax))

    # It didn't like the cross entropy form of loss, changing it to mean squared error worked!
    model.compile(optimizer="Adam", loss="mean_squared_error", metrics=["accuracy"])

    model.fit(X_train, y_train, epochs=5)

    loss, accuracy = model.evaluate(X_test, y_test)

    print(accuracy)
    print(loss)

    model.save("breast_cancer.model")

1/0

loaded_model = tf.keras.models.load_model('digits.model')
path_to_image = os.path.join(this_directory,'3.png')
image_3_bgr = cv.imread(path_to_image)
image_3_grey = image_3_bgr[:,:,0]
# image_3_grey = image_3_grey.reshape((784, 1))
image_3_grey = image_3_grey/image_3_grey.max()
image_3_grey_1 = image_3_grey.copy()
input = np.array([image_3_grey,image_3_grey_1])
prediction = loaded_model.predict(input)
result = np.argmax(np.max(prediction[0], axis=0))
result_3 = np.argmax(np.max(prediction[0], axis=1))
result_1 = np.argmax(np.max(prediction[1], axis=0))
result_4 = np.argmax(np.max(prediction[1], axis=1))

result_4 = np.where(prediction[0] == np.max(prediction[0]))

1/0