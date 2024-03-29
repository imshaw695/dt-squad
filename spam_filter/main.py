# first I need to make a web scraper using beautifulsoup
# import necessary modules
import requests
from bs4 import BeautifulSoup
import json
import spacy
import re

def bbc_scraper(url):
    """
    This function should take a url, which will relate to a bbc news article 
    and return a json object containing the following fields:
    1) URL (provided.  For example https://www.bbc.co.uk/news/uk-51004218)
    2) Title
    3) Date_published
    4) Content --(the main body of article, this must be one continuous string without linebreaks)
    The function must be iterable (If placed in a for loop and provided with several URLs in 
    turn return the correct json object for each time it is invoked without any manual intervention)
    """
    r1 = requests.get(url)
    coverpage = r1.content

    soup1 = BeautifulSoup(coverpage, 'html.parser')

    # scrape title, date, and content of article
    scraped_article_title = soup1.find_all('h1')
    title = scraped_article_title[0].get_text()
    
    scraped_date_published = soup1.find_all('time')
    date_published = scraped_date_published[0].get_text()

    scraped_content = soup1.find_all('p',class_="ssrcss-1q0x1qg-Paragraph eq5iqo00")

    scraped_content_list = []
    for index,line in enumerate(scraped_content[0:-4]):
        p = scraped_content[index].get_text()
        scraped_content_list.append(p)

    content = ' '.join(scraped_content_list)
    content = content.replace('\\', '')
    content = content.replace(' This video can not be played', '')
    data = {"URL":url, "Title": title,"Date_published":date_published,"Content":content}

    results_json = json.dumps(data)

    return results_json

def extract_entities(string):
    """
    This function should return a json containing the:
    1) People
    2) Places
    3) Organisations 
    in the text string provided.
    """
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(string)

    people = []
    places = []
    organisations = []

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            people.append(ent.text)
        if ent.label_ == "GPE":
            places.append(ent.text)
        if ent.label_ == "ORG":
            organisations.append(ent.text)
    
    entities = {"people":people, "places":places, "organisations":organisations}

    entities_json = json.dumps(entities)

    return entities_json

####################################################################
# Test cases

def test_bbc_scrape():
    results = {'URL': 'https://www.bbc.co.uk/news/uk-52255054',
                'Title': 'Coronavirus: \'We need Easter as much as ever,\' says the Queen',
                'Date_published': '11 April 2020',
                'Content': '"Coronavirus will not overcome us," the Queen has said, in an Easter message to the nation. While celebrations would be different for many this year, she said: "We need Easter as much as ever." Referencing the tradition of lighting candles to mark the occasion, she said: "As dark as death can be - particularly for those suffering with grief - light and life are greater." It comes as the number of coronavirus deaths in UK hospitals reached 9,875. Speaking from Windsor Castle, the Queen said many religions had festivals celebrating light overcoming darkness, which often featured the lighting of candles. She said: "They seem to speak to every culture, and appeal to people of all faiths, and of none. "They are lit on birthday cakes and to mark family anniversaries, when we gather happily around a source of light. It unites us." The monarch, who is head of the Church of England, said: "As darkness falls on the Saturday before Easter Day, many Christians would normally light candles together.  "In church, one light would pass to another, spreading slowly and then more rapidly as more candles are lit. It\'s a way of showing how the good news of Christ\'s resurrection has been passed on from the first Easter by every generation until now." As far as we know, this is the first time the Queen has released an Easter message. And coming as it does less than a week since the televised broadcast to the nation, it underlines the gravity of the situation as it is regarded by the monarch. It serves two purposes really; it is underlining the government\'s public safety message, acknowledging Easter will be difficult for us but by keeping apart we keep others safe, and the broader Christian message of hope and reassurance.  We know how important her Christian faith is, and coming on the eve of Easter Sunday, it is clearly a significant time for people of all faiths, but particularly Christian faith. She said the discovery of the risen Christ on the first Easter Day gave his followers new hope and fresh purpose, adding that we could all take heart from this.  Wishing everyone of all faiths and denominations a blessed Easter, she said: "May the living flame of the Easter hope be a steady guide as we face the future." The Queen, 93, recorded the audio message in the White Drawing Room at Windsor Castle, with one sound engineer in the next room.  The Palace described it as "Her Majesty\'s contribution to those who are celebrating Easter privately".  It follows a speech on Sunday, in which the monarch delivered a rallying message to the nation. In it, she said the UK "will succeed" in its fight against the coronavirus pandemic, thanked people for following government rules about staying at home and praised those "coming together to help others". She also thanked key workers, saying "every hour" of work "brings us closer to a return to more normal times".'}
    scraper_result = bbc_scraper('https://www.bbc.co.uk/news/uk-52255054')
    assert json.loads(scraper_result) == results


def test_extract_entities_amazon_org():
    input_string = "I work for Amazon."
    results_dict = {'people':[],
                    'places':[],
                    'organisations': ['Amazon']
                    }
    extracted_entities_results = extract_entities(input_string)
    assert json.loads(extracted_entities_results) == results_dict


def test_extract_entities_name():
    input_string = "My name is Bob"
    results_dict = {'people':['Bob'],
                    'places':[],
                    'organisations': []
                    }
    extracted_entities_results = extract_entities(input_string)
    assert json.loads(extracted_entities_results) == results_dict

if __name__ == "__main__":
    bbc_scraped = bbc_scraper("https://www.bbc.co.uk/news/uk-51004218")
    test_bbc_scrape()
    test_extract_entities_amazon_org()
    test_extract_entities_name()