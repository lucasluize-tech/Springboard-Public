# Using Flask to make requests to API

We could do requests form the Browser using only javaScript ( **AJAX/AXIOS** ),
But instead we'll make flask server do it , so we could use our database, or
access APIs that requires Same-Origin Policy. So we'll need Passwords/Keys.

## **Storing API KEYS** :

The best practice is to create a new file like secret.py and store the keys there,
instead of hard-coding into the server app.py. then we'll make sure we add this file
to the .gitignore so we won't push to github. Every API has different credentials,
should always read their docs.

## **Making requests**

Let's use the requests from python:  
```python
import requests

term = 'jack johnson'

response = requests.get(
    'http://itunes.apple.com/search', params={'term':term, 'limit':5}
)

data = response.json() # creates a python dictionary
data['results'][0] # will show the first result for the search params.

# now we can manipulate data however we want.
for result in data['results']:
    print f' Track: {result.['trackName']}, album: {result['collectionName']}'
```

both .get() and .post() return a response with .text, .status_code and .json()

Let's try a POST request now:  
```python
import requests


data = {
    'username': 'chickenS',
    'tweets': [
        'hello!',
        'goodbye!',
        'bock bock!',
         {
            'id': 1,  'text': 'my first tweet!'
         }
    ]
}

res = requests.post('<link from requestBin to check our posts in a GUI>', json=data)
# best practice to send data as a json format.
```

## **Integrating into a Flask app**:

```python
from flask import Flask, render_template, request
from forms import GeoForm
import requests

API_BASE_URL = 'http://www.mapquestapi.com/geocoding/v1' # using the free MapquestApi
key = '< the key from mapquest we created >'

app = Flask(__name__)

def get_coords(address):
    res = requests.get(API_BASE_URL, params={'key':key, 'location': address})
    data = res.json()['results']
    lat = data['locations'][0]['latLgn']['lat']
    lng = data['locations'][0]['latLgn']['lgn']
    
    return {'lat':lat, 'lng':lng}
    
@app.route('/geocode')
def address_from():
    form = GeoForm()
    
    if form.validate_on_submit():
    
        address = requests.args['address'] # if its a get request we use args   
        coords = get_coords(address)
        
        return redirect("address-form.html", form=form, coords=coords)
        # let's suppose we have a template to use.
    else:
        return render_template("address-form.html", form=form)
```

## Passing data to a Model and Save to DB:

Define a Model , get data from the API and push to database to create a new Model