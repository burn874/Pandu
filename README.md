# Pandu
### Winning Project of [SMU Fintech x Bambu Challenge 2018](https://developer.bambu.life/page/bambu-fintech-challenge)
###### University | House | Investing Portfolio Calculator

### TL;DR

Access [this website](http://fintech.skydronesg.com/)  to demo it

### Filepaths of Each Calculator | Backend Side (without much CSS)

<sub><sup><b><i>(Remember to set LOCALISED to 1 in LOCALISED.js to set up locally)</b></i></sup></sub>

**University** : separate_functionality/university_cost_living/university_cost.html

**Housing** : separate_functionality/house_price/house_prices.html

**Investing** : separate_functionality/investing_portfolio/investing portfolio.html

### Files Information

**Information on the folder and files**

    Folder - separate_functionality | Individual Modules for the expense & investment calculator
        Folder - university_cost_living | Calculator for the cost of living in university and study loan repayments
        Folder - house_price | Calculator for the cost in properties in Singapore and monthly repayments
        Folder - investing_portfolio | Grapher for risk portfolio vs time (years)
    Folder - Python | All the webcrawlers and data scraped from internet
        Folder - google_map | KML files for SG map and scripts to use online platform for geo-coordinates
        Folder - house_locations | JSON files as database for dropdown menu, inputs location, outputs house_type
        Folder - room_types | JSON files as database for dropdown menu, inputs house_type, outputs location
        Folder - uni | Python Scripts that scrape the university living cost and the database for those information
        get_housetype.py | Gets all the house_type in the API and combine into list, for faster loading, rather than multiple calls
    Folder - wordpress | All the backend code + split into various html files for wordpress deployment
    Folder - useless files | Useless, but kept as a record of what is done before and failed
    Folder - node_modules | Not sure, what are really useful, but just there to ensure it works
    index.html | Empty yet, might serve no purpose
    LOCALISED.js | Key javascript file to allow local server to work, set LOCALISED to 1


### APIs or Modules Used

**Python**

    Pandas | Numpy | BeautifulSoup4 | Tabula | Selenium | Keyboard | FastKML | ElementTree | Shapely

**Javascript**

    jQuery | jQueryUI | Google Maps Javascript | Google Charts | Cross-Origin Resource Sharing
