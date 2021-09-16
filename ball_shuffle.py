from random import shuffle

table = [' ', 'o', ' ']

def shuffle_table(table):
    shuffle(table)
    return table

random_table = shuffle_table(table)

lives = 2

game_on = True

while game_on:
    if lives == 0:
        print('You ran out of lives, game over.')
        break

    guess = int(input("Which cup is the ball under (1,2, or 3)? "))

    if random_table[(guess - 1)] == 'o':
        print("Congratulations! You win.")
        game_on = False

    else:
        print('Sorry, wrong answer.')
        lives = lives - 1