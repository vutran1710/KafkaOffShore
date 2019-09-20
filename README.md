Using Youtube Dataset downloaded from http://netsg.cs.sfu.ca/youtubedata/
**Data format**:

```
video ID	an 11-digit string, which is unique
uploader	a string of the video uploader's username
age         an integer number of days between the date when the video was uploaded and Feb.15, 2007 (YouTube's establishment)
category	a string of the video category chosen by the uploader
length      an integer number of the video length
views       an integer number of the views
rate        a float number of the video rate
ratings     an integer number of the ratings
comments	an integer number of the comments
related IDs	up to 20 strings of the related video IDs
```

## TODO

Considering what to add to sweeten the pot and make shit easier to understand!

- [ ] Add PouchDB
- [ ] Add ClientApp with PouchDB for db real-time tracking
