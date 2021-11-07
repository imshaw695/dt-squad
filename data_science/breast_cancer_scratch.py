import cv2 as cv
import numpy as np
from sklearn.model_selection import train_test_split
import tensorflow as tf
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
    
data_05 = np.array(data_04)

X = data_05[:, :-2]
y = data_05[:, -2:]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=1)

model = tf.keras.models.Sequential()
model.add(tf.keras.layers.Flatten(input_shape=(1,43)))

if True:
   
    # This creates a hidden layer and sets the amount of neurons, 128, and the activation function, which is relu
    model.add(tf.keras.layers.Dense(units=30, activation=tf.nn.relu))

    # Finally, you create the output layer. softmax scales them down so that they add up to 1
    model.add(tf.keras.layers.Dense(units=2, activation=tf.nn.softmax))

    model.compile(optimizer="Adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])

    model.fit(X_train, y_train, epochs=3)

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