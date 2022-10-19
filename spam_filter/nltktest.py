from tkinter.tix import Tree
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

sentence = """Arthur at eight o'clock on Thursday morning
... Arthur didn't feel very good.
Arthur went to the shop in Coventry to buy milk made by Arla from Tesco

"""

tokens = nltk.word_tokenize(sentence)
print(tokens)

tagged = nltk.pos_tag(tokens)
print(tagged)

entities = nltk.chunk.ne_chunk(tagged)
print(entities[0])

people = []

for entry in entities:
    if entry.isinstance(entry, Tree):
        people.extend(entry)
    else:
        people.append(entry)
        





#use dictionaries for GPE's, etc and loop over the text with nltk and spacy to add to these dictionaries
1/0