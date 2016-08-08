
Image Search Microservice

Features

    Get the image URLs for a set of images relating to a given search string.
    Able to paginate through the results using ?offset query.
    Get a list of the 10 most recently submitted search strings.
Usage:

Search for Images:

    http://imgsearch-ms.heroku.com/api/imagesearch/golfing cats

Page for next results:

    http://imgsearch-ms.heroku.com/api/imagesearch/golfing cats?offset=5

List most recent search terms:

    http://imgsearch-ms.heroku.com/api/latest/imagesearch
    
JSON Response:

    Returns an array of image objects
    [ { title: '...',
        url: '...',
        thumbnail: '...',
        source: '...'
      } 
    ]

Install:

    NodeJS required

    Mongodb required

    Clone or download repository to a directory then run "npm install"

        Installs express, ejs, mongoose, morgan, serve-favicon, dotenv

    If not running locally two environment variables are required:

        API_KEY      = Bing Search API Key
        
        DATABASEURL = URL for mongodb installation


