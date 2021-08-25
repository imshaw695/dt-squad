'''
I will need to use random to randomly select a word from a list
Then make a function that produces underscores _ to the same length as the word
Then you will need a while loop which takes in inputs from the user, then produce the different outcomes depending
on those inputs. So for 

'''

import random  
from underscore_function import underscore_function

word_bank = ['picture', 'boat','house', 'building', 'microwave']

word_choice_index = int(random.random() * len(word_bank))
word_choice = word_bank[word_choice_index]

secret_word = underscore_function(word_choice)

lives = int(len(secret_word) * 2)
word_choice_list = list(word_choice)


while secret_word != word_choice:
    if lives == 0:
        print("You ran out of lives, Game Over.")
        break
    print(f'You have {lives} chances to guess correctly: \n{secret_word} ')
    guess = input('Please guess a letter or try to guess the whole word: ').strip().lower()

    if guess.isalpha() == False:
        print(f'You guessed {guess}, please type a letter from the alphabet.')
        continue
    
    else:
        if len(guess) == 1:
            if guess in word_choice:
                print("Correct guess!")

            else:
                print("Wrong guess, try again!")
                lives = lives - 1
        else:
            if guess == word_choice:
                print(f'Your secret word was: {word_choice} Congratulations! You have won the game.')
                break
            else:
                print("Wrong guess, try again!")
                live = lives - 1
             
            

# Make the secret word into a list, the append the index of that list into the underscores when it's correct



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

# Create function for underscores, test-driven development, add comments to number game