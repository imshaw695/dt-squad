import random

def get_word_list():
    with open("word_list.txt") as file:  # open supplied txt file of words
        bank = file.read()  # read it
        word_list = bank.split("\n")  # split down into a list separating each line
        return word_list


def get_secret_word(
    word_choice, guesses
):  # creates the word needed to be uncovered
    word_choice_blank = ""
    for letter in word_choice:
        if letter in guesses:
            word_choice_blank = word_choice_blank + letter
        else:
            word_choice_blank = word_choice_blank + "*"
    return word_choice_blank


def get_guess(guess_attempts, secret_word):
    valid_guess = False
    while not valid_guess:
        guess = (
            input(f"Your clue is: {secret_word}: Please enter your next guess: ").strip().lower()
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
    word_bank = get_word_list()
    word_choice_index = int(random.random() * len(word_bank))  # chooses a random index
    # chooses a word from the word bank with the index
    word_choice = word_bank[word_choice_index]

    # creates a pool of lives relative to the length of the word
    lives = 7
    # turns the word into a list, might have been unnecessary
    word_choice_list = list(word_choice)
    guess_attempts = []  # creates a bank of the previously attempted guesses

    # uses function to produced the secret word in underscores
    secret_word = get_secret_word(word_choice, guess_attempts)
    while secret_word != word_choice:
        if lives == 0:  # how to end the game with player runs out of lives
            print("you lose")
            break
        # tell the player their life count, show the word, and previous attempts
        print(
            f"You have {lives} chances to guess correctly. You have attempted: {guess_attempts}\n{secret_word}"
        )
        guess = get_guess(guess_attempts, secret_word)
        # if it is from the alphabet
        if len(guess) == 1:  # if they guessed a letter
            if guess in word_choice:  # if letter guessed is in the word
                print("Correct guess!")
                secret_word = get_secret_word(word_choice, guess_attempts)
                if secret_word == word_choice:  # checking if they completed the word
                    print("congratulations you win")
            else:  # what happens if they guess incorrectly
                print("Wrong guess, try again!")
                lives = lives - 1
        else:
            if guess == word_choice:
                print("congratulations you win")
                break
            else:
                print("Wrong guess, try again!")
                lives = lives - 1


if __name__ == "__main__":
    play_game()