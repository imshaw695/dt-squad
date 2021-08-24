my_list = [(1,5),2,(4,7,2),4,5,6]
print(my_list[2])

dict = {'key1':5, 'key2':6, 'key3':7}

for number in dict.values():
    print(number)

word = 'farts'

for letters in word:
    print('farts')

words = 'what the heck'

for a,b in enumerate(words):
    print(a)
    print(b)

list1 = [1,2,3,4,5]
list2 = ['a','b','c','d','e']

for a,b in zip(list1,list2):
    print(b)

list3 = [1,2,3]
list4 = ['a','b','b']

print(zip(list3,list4))

my_dict = {'poop':3, 'pee':4, 'fart':5}

for keys in my_dict:
    print(my_dict[keys])

print('poop' in my_dict.keys())

word = 'guatemala'
word_letters = []
for letter in word:
    word_letters.append(letter)
print(word_letters)

print(word_letters[1])

word_letters[1] = 'a'

print(word_letters)