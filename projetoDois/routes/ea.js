var unirest = require('unirest');
var express = require('express');
var app = express();


router.get('/', function(req, res){
    unirest.get("https://community-open-weather-map.p.rapidapi.com/weather")
      .header("X-RapidAPI-Key", "766086636dmsh77c84dc0a496b5bp1d67e4jsne48fe28337f8")
      .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
      .query({
          'appid' : '2172797',
          'lon': '12.4924',
          'lat': '41.8902',
          'units': 'metric',
          'mode': 'html'
      })
      .end(function (result) {
        res.json(docs);
        res.end();
      });
    })

    app.listen(3003, function(){
        console.log('Server running at http://127.0.0.1:8081/');
      })
   