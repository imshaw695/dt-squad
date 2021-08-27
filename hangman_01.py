"""
PROBLEM: Does not work for words with duplicate letters
Solution? incorporate it into the original function. recreate it each run through? 
Maybe make a list and when a guess is correct, add it to the correct_guess_list and then populate the underscores with that too?
Is there a way to gather more than one index from the original word in order to replace the duplicate in the underscore list?
There is a replace() function that I could potentially use, but I can't specify which underscores to replace
"""
import random

# importing the function that creates the underscores out of a word choice
# from underscore_function import underscore_function
def underscore_function(word_choice, guesses):
    word_choice_blank = ''
    for letter in word_choice:
        if letter in guesses:
            word_choice_blank = word_choice_blank + letter
        else:
            word_choice_blank = word_choice_blank + '_'
    return word_choice_blank

def get_guess(guess_attempts):
    valid_guess = False
    while not valid_guess:
        guess = (
            input("Please guess a letter or try to guess the whole word: ").strip().lower()
        )  # prompt player for a guess
        if guess in guess_attempts:  # stops player from guessing the same thing twice
            print("You already used that, guess again!")
            continue
        guess_attempts.append(guess)  # adds attempts to the list
        if (
            guess.isalpha() == False
        ):  # checks to make sure that the guess (string) characters are all from the alphabet
            print(f"You guessed {guess}, please type a letter from the alphabet.")
            continue
        valid_guess = True
    return guess
def play_game():
    word_bank = ["granny", "heckington", "turkey", "takeaway"]  # a simple word bank

    word_choice_index = int(random.random() * len(word_bank))  # chooses a random index
    # chooses a word from the word bank with the index
    word_choice = word_bank[word_choice_index]

    # creates a pool of lives relative to the length of the word
    lives = 6
    # turns the word into a list, might have been unnecessary
    word_choice_list = list(word_choice)
    guess_attempts = []  # creates a bank of the previously attempted guesses

    # uses function to produced the secret word in underscores
    secret_word = underscore_function(word_choice, guess_attempts)
    while secret_word != word_choice:
        if lives == 0:  # how to end the game with player runs out of lives
            print("You ran out of lives, Game Over.")
            break
        # tell the player their life count, show the word, and previous attempts
        print(
            f"You have {lives} chances to guess correctly: \n{secret_word} you have attempted: {guess_attempts} "
        )
        guess = get_guess(guess_attempts)
    # if it is from the alphabet
        if len(guess) == 1:  # if they guessed a letter
            if guess in word_choice:  # if letter guessed is in the word
                print("Correct guess!")
                secret_word = underscore_function(word_choice, guess_attempts)
                if secret_word == word_choice:  # checking if they completed the word
                    print(
                        f"Your secret word was: {word_choice} \nCongratulations! You have won the game with {lives} lives remaining."
                    )
            else:  # what happens if they guess incorrectly
                print("Wrong guess, try again!")
                lives = lives - 1
        else:
            if guess == word_choice:
                print(
                    f"Your secret word was: {word_choice} \nCongratulations! You have won the game with {lives} lives remaining."
                )
                break
            else:
                print("Wrong guess, try again!")
                lives = lives - 1

if __name__ == '__main__':
    play_game()

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
