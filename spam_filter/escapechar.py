import requests
from bs4 import BeautifulSoup
import json
import spacy
import re
nlp = spacy.load("en_core_web_sm")
    
r1 = requests.get('https://www.bbc.co.uk/news/uk-52255054')
coverpage = r1.content

soup1 = BeautifulSoup(coverpage, 'html.parser')

# scrape title, date, and content of article
scraped_article_title = soup1.find_all('h1')
title = scraped_article_title[0].get_text()
print(title)
scraped_date_published = soup1.find_all('time')
date_published = scraped_date_published[0].get_text()
print(date_published)
scraped_content = soup1.find_all('p',class_="ssrcss-1q0x1qg-Paragraph eq5iqo00")

scraped_content_list = []
for index,line in enumerate(scraped_content[0:-4]):
    p = scraped_content[index].get_text()
    scraped_content_list.append(p)
print(scraped_content_list)

content = ' '.join(scraped_content_list)
content = content.replace('\\', '')
data = {"URL":'https://www.bbc.co.uk/news/uk-52255054', "Title": title,"Date_published":date_published,"Content":content}