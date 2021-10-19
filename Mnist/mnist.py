import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import os

this_directory = os.path.abspath(os.path.dirname(__file__))

if False:
    # get the mnist dataset
    mnist = tf.keras.datasets.mnist
    # split the dataset into the test set and training set
    (x_train, y_train), (x_test, y_test) = mnist.load_data()

    # normalize the independent variables, what does axis mean?
    x_train = tf.keras.utils.normalize(x_train, axis=1)
    x_test = tf.keras.utils.normalize(x_test, axis=1)

    # create a basic sequential model
    model = tf.keras.models.Sequential()

    # Creates input layer
    model.add(tf.keras.layers.Flatten(input_shape=(28,28)))
    # This creates a hidden layer and sets the amount of neurons, 128, and the activation function, which is relu
    model.add(tf.keras.layers.Dense(units=30, activation=tf.nn.relu))

    # Finally, you create the output layer. softmax scales them down so that they add up to 1
    model.add(tf.keras.layers.Dense(units=10, activation=tf.nn.softmax))

    model.compile(optimizer="Adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])

    model.fit(x_train, y_train, epochs=3)

    loss, accuracy = model.evaluate(x_test, y_test)

    print(accuracy)
    print(loss)

    model.save("digits.model")

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