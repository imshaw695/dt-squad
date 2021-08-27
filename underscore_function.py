def underscore_function(word_choice, guesses):
    word_choice_blank = ''
    for letter in word_choice:
        if letter in guesses:
            word_choice_blank = word_choice_blank + letter
        else:
            word_choice_blank = word_choice_blank + '_'
    return word_choice_blank

if __name__ == '__main__':
    # Test begins
    word_choice = 'building'
    guesses = []
    word_choice_blank = underscore_function(word_choice, guesses)
    if word_choice_blank == '________':
        print('[SUCCESS] The test worked correctly')
    else:
        print('[FAILURE] The test did not work')

    # Test begins
    word_choice = 'building'
    guesses = ['u', 'i']
    word_choice_blank = underscore_function(word_choice, guesses)
    correct_answer = '_ui__i__'
    if word_choice_blank == correct_answer:
        print('[SUCCESS] The test worked correctly')
    else:
        print('[FAILURE] The test did not work')