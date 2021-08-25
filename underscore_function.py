def underscore_function(word_choice):
    word_choice_blank = ''
    for letters in word_choice:
        word_choice_blank = word_choice_blank + '_'

    return word_choice_blank

if __name__ == '__main__':
    print(__name__)
    word_choice = 'building'
    word_choice_blank = underscore_function(word_choice)
    if word_choice_blank == '________':
        print('[SUCCESS] The test worked correctly')
    else:
        print('[FAILURE] The test did not work')