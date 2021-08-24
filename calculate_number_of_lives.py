def calculate_number_of_lives(high_value):
    number_of_lives = 0
    while high_value > 1:
        high_value = high_value / 2
        number_of_lives = number_of_lives + 1
    return number_of_lives
if __name__ == '__main__':
    print(__name__)
    high_value = 32
    number_of_lives = calculate_number_of_lives(high_value)
    if number_of_lives == 5:
        print('[SUCCESS] The test worked correctly')
    else:
        print('[FAILURE] The test did not work')

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