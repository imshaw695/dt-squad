import random  
from underscore_function import underscore_function # importing the function that creates the underscores out of a word choice

word_bank = ['picture', 'boat','house', 'building', 'microwave'] # a simple word bank

word_choice_index = int(random.random() * len(word_bank)) # chooses a random index
word_choice = word_bank[word_choice_index] # chooses a word from the word bank with the index

secret_word = underscore_function(word_choice) # uses function to produced the secret word in underscores

lives = int(len(secret_word) * 2) # creates a pool of lives relative to the length of the word
word_choice_list = list(word_choice) # turns the word into a list, might have been unnecessary
guess_attempts = [] # creates a bank of the previously attempted guesses

while secret_word != word_choice:
    if lives == 0: # how to end the game with player runs out of lives
        print("You ran out of lives, Game Over.")
        break
    print(f'You have {lives} chances to guess correctly: \n{secret_word} you have attempted: {guess_attempts} ')
    guess = input('Please guess a letter or try to guess the whole word: ').strip().lower()
    if guess in guess_attempts: # stops player from guessing the same thing twice
        print("You already used that, guess again!")
        continue
    guess_attempts.append(guess) # adds attempts to the list
    if guess.isalpha() == False: # checks to make sure that the guess (string) characters are all from the alphabet
        print(f'You guessed {guess}, please type a letter from the alphabet.')
        continue
    
    else: # if it is from the alphabet
        if len(guess) == 1: # if they guessed a letter
            if guess in word_choice:
                print("Correct guess!")
                secret_word_list = list(secret_word)
                secret_word_list[word_choice.index(guess)] = guess
                secret_word = ''
                for letters in secret_word_list:
                    secret_word = secret_word + letters
                if secret_word == word_choice:
                    print(f'Your secret word was: {word_choice} \nCongratulations! You have won the game with {lives} lives remaining.')
            else:
                print("Wrong guess, try again!")
                lives = lives - 1
        else:
            if guess == word_choice:
                print(f'Your secret word was: {word_choice} \nCongratulations! You have won the game with {lives} lives remaining.')
                break
            else:
                print("Wrong guess, try again!")
                lives = lives - 1
             
            
# Make a list of words
# Pick one a random
# Create underscores correctly based on guesses and correct word 
# Ask for input (guess)
# Evaluate the guess
    # Check if guess is a letter/whole word
    # Check if part of the secret word
    # If it is part, do not lose a life
    # If wrong, lose a life
    # If letter completes the word, player wins/game completes
# Keep track of lives
# Keep track of correct guesses
# Print appropriate message at the end
