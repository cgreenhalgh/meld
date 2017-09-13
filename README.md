MELD: Music Encoding and Linked Data
====================================

This repository contains the MELD demonstrator. 

* To install: pip install -r requirements.txt
* To run: python manage.py runserver

By default, it will run on localhost port 5000. 

## Docker

Python 2.7.6

```
docker build -t meld .
```

Run once
```
docker run -it --rm --name=meld meld
```

