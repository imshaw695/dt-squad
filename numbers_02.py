import random # Bringing in random library
from calculate_number_of_lives import calculate_number_of_lives # Brought in the function from the other file

while True: # It will keep running forever unless you break out of it when you set it to true
    start_game = input('Would you like to play? (Y/N): ').lower().strip() # strip takes the spaces off
    if start_game == 'y':
        print("Let's play!")
        break # moves you out of this block of code
    else:
        print('Too bad!') # Block of code will run again
high_value = 1000000
low_value = 0
secret_number = random.randint(low_value,high_value) # creates the secret number as a random integer in the specified range

number_of_lives = calculate_number_of_lives(high_value) # Using the function in the other file to calculate the number of lives
print(f'You have to guess a number between {low_value} and {high_value}, you have {number_of_lives} lives.')
guess = None # Not needed
winner = True

while winner:
    if number_of_lives == 0:
        print('You lose!')
        break
    guess = input(f'You have {number_of_lives} lives, please choose a number between 1 and 1000000: ').strip() # tells you number of lives each run
    if guess.isdigit(): # checks to make sure your guess (inputs are strings) is a number
        guess = int(guess) # turns it into an integer
    else:
        print(f"You typed {guess}, please type an integer.") # prompts them to guess again and shows them the wrong format they used
        continue # starts the block of code/loop again
    if guess != secret_number:
        print('Try again!')
        if guess < secret_number:
            print(f'Your guess of {guess} was too low.')
        if guess > secret_number:
            print(f'Your guess of {guess} was too high.')
        number_of_lives = number_of_lives - 1
    else:
        print('Congratulations! You are correct.')
        winner = False # ends the loop, could we use break instead?

