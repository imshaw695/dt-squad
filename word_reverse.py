def spin_words(sentence):
    spinned_sentence = []
    sentence = sentence.split()
    for word in sentence:
        if len(word)>=5:
            spinned_word = word[::-1]
            spinned_sentence.append(spinned_word)
        
        else:
            spinned_sentence.append(word)
    
    spinned_sentence = ' '.join(spinned_sentence)

    return spinned_sentence

sentence = 'Hello everybody welcome aboard my boat'

spinned_sentence = spin_words(sentence)

print(spinned_sentence)