import spacy


nlp = spacy.load("en_core_web_sm")

sentence = """At eight o'clock on Thursday morning
... Arthur didn't feel very good.
Arthur went to the shop in New York to buy milk made by Arla from Tesco
Arthur was a director at Chickens Limited
"""
doc = nlp(sentence)
for token in doc:
    print(token.text)
    print(token.pos_)
    print(token.dep_)


people = []
places = []
orgs = []
for ent in doc.ents:
    print(ent.text, ent.label_)
    if ent.label_ == "PERSON":
        people.append(ent.text)
    if ent.label_ == "GPE":
        places.append(ent.text)
    if ent.label_ == "ORG":
        orgs.append(ent.text)

    
1/0