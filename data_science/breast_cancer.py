# Data Preprocessing

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os
from sklearn.preprocessing import OrdinalEncoder
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense

this_directory = os.path.abspath(os.path.dirname(__file__))
# Importing the dataset
path_to_data = os.path.join(this_directory,'breast-cancer.csv')
dataset = pd.read_csv(path_to_data)
data = dataset.values

X = data[:, :-1].astype(str)
y = data[:, -1]
y = y.reshape((len(y),1))
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=1)

# I need to use ordinal encoder on related values like age, and onehotencoder on unrelated ones like menopause
# ordinal - age, tumor size, degree of malignancy, inv-nodes
# onehotencoder for node-caps (3), breast, breast-quad, and irradiat
ordinal = OrdinalEncoder()
ordinal.fit(X_train)
X_train_encoded = ordinal.transform(X_train)
X_test_encoded = ordinal.transform(X_test)

label_encoder = LabelEncoder()
label_encoder.fit(y_train)
y_train_encoded = label_encoder.transform(y_train)
y_test_encoded = label_encoder.transform(y_test)

# define the  model
model = Sequential()
model.add(Dense(10, input_dim=X_train_encoded.shape[1], activation='relu', kernel_initializer='he_normal'))
model.add(Dense(1, activation='sigmoid'))
# compile the keras model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
# fit the keras model on the dataset
model.fit(X_train_encoded, y_train_encoded, epochs=100, batch_size=16, verbose=2)
# evaluate the keras model
_, accuracy = model.evaluate(X_test_encoded, y_test_encoded, verbose=0)
print('Accuracy: %.2f' % (accuracy*100))


