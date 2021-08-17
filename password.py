import random
import string
'''
Randomly select numbers, letters, symbols from a list. Make it stop once the password, or list of numbers, reaches a certain amount (say 15 characters). Creating a list of
every possible character seems to be a very inneficient way to do this. There is a way to generate characters using ASCII code (65-90 uppercase, 97-122 lowercase)
Create a list of characters, password_index, and have them randomly selected to be put into the password
'''
password = [] # online guides do not produce a list of characters, try to do it with a list!

lowercase = string.ascii_lowercase
uppercase = string.ascii_uppercase
num = [1,2,3,4,5,6,7,8,9,0]
lowercase_list = list(lowercase)
uppercase_list = list(uppercase)

while len(password) < 15:
    password.append()