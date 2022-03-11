# first I need to make a web scraper using beautifulsoup
# import necessary modules
import requests
from bs4 import BeautifulSoup
import json

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

    soup1 = BeautifulSoup(coverpage, 'html5lib')

    # scrape title, date, and content of article
    scraped_article_title = soup1.find_all('h1')
    title = scraped_article_title[0].get_text()
    
    scraped_date_published = soup1.find_all('time')
    date_published = scraped_date_published[0].get_text()

    scraped_content = soup1.find_all('p')
    scraped_content_list = []
    for index,line in enumerate(scraped_content):
        p = scraped_content[index].get_text()
        scraped_content_list.append(p)

    content = ' '.join(scraped_content_list)

    data = {"URL":url, "Date_published":date_published,"Content":content}

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

    return entities_json

if __name__ == "__main__":
    bbc_scraped = bbc_scraper("https://www.bbc.co.uk/news/uk-51004218")
    print(bbc_scraped)