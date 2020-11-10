const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
var router = express.Router();
var unirest = require('unirest');
let request = require('request');
//const mysql = require("mysql");
var where = require('node-where');



//***********POSTS**********//



///////////////////POSTS WEATHER 

/* GET Postlist page. */
router.get('/postlist', function(req, res) {
  var db = require("../db");
  var Posts = db.Mongoose.model('postslist', db.PostSchema,
'postslist');
var cityname = req.query.city
var sort = req.query.sort

  Posts.find({city: cityname}).sort( { date: -1 } ).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end();  });
});


/* POST to Add User Service */
router.post('/addpost', function (req, res) {
  console.log(req.body)
  var content = req.body.content;
  var userName = req.body.username;
  var cityName = req.body.city;
  console.log(userName)
  console.log(content)

  var db = require("../db");
  
  var Posts = db.Mongoose.model('postslist', db.PostSchema,
'postslist');
  var user = new Posts({ username: userName, content:
content, city: cityName, date: new Date() });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          // res.redirect("userlist");
      }
  });
});




/* PUT  user STATUS (com posts). */
router.put('/userstatus/:id', function (req, res, next) {
  console.log("Update status")
  var db = require('../db');
  var User = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
User.findOneAndUpdate({ _id: req.params.id }, req.body,
{ upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
      console.log("Updated")

  });
});



///////////////////POSTS CITY

/* GET Postlist page. */
router.get('/postlistcity', function(req, res) {
  var db = require("../db");
  var Posts = db.Mongoose.model('postscity', db.CitySchema,
'postscity');
var cityname = req.query.city
  Posts.find({city: cityname}).sort( { date: -1 } ).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end();  });
});



/* POST to Add User Service */
router.post('/addpostcity', function (req, res) {
  console.log(req.body)
  var content = req.body.content;
  var userName = req.body.username;
  var cityName = req.body.city;
  console.log(userName)
  console.log(content)

  var db = require("../db");
  
  var Posts = db.Mongoose.model('postscity', db.CitySchema,
'postscity');
  var user = new Posts({ username: userName, content:
content, city: cityName, date: new Date() });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          // res.redirect("userlist");
      }
  });
});



/////////////////////////////POST ACTIVITIES


/* GET Postlist activities page. */
router.get('/postlistactivities', function(req, res) {
  var db = require("../db");
  var Posts = db.Mongoose.model('postsactivities', db.ActivitiesSchema,
'postsactivities');
var cityname = req.query.city
// var status = req.query.status

  Posts.find({city: cityname}).sort( { date: -1 } ).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end();  });
});



/* POST to Add User Service */
router.post('/addpostactivities', function (req, res) {
  console.log(req.body)
  var content = req.body.content;
  var userName = req.body.username;
  var cityName = req.body.city;
  console.log(userName)
  console.log(content)

  var db = require("../db");
  
  var Posts = db.Mongoose.model('postsactivities', db.ActivitiesSchema,
'postsactivities');
  var user = new Posts({ username: userName, content:
content, city: cityName, date: new Date() });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          // res.redirect("userlist");
      }
  });
});


////////////////////////////////////


//////////////////////////////GET SUGGESTIONS

/* GET SUGGESTIONS page. */
router.get('/suggested', function(req, res) {
  suggested = {
    cold: {
        img: "data:image/jpeg;base64,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",
        activities: ["Read a book", "Sleep", "Have a walk in the cold", "Drink hot chocolate"],
        clothes: ["Coat"]

    },rain: {
        img: "data:image/jpeg;base64,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",
        activities: [ "Have a walk in the rain"],
        clothes: ["Raincoat", "Boots", "Umbrella"]

    },warm: {
        img: "data:image/jpeg;base64,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"
        ,activities: [ "Go outdoors!"],
        clothes: ["No need to grab a coat! It's warm outside!"]

    }
}
console.log(suggested)
res.send(suggested);


});



//******************************************************** */
// *GET* test
router.get('/', function(req, res, next){
  res.send("Express is running successfully!");
});



//***********USERS**********//////////////////////////////////
/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  Users.find({}).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end();  });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

  console.log(req.body)
  var userName = req.body.username;
  var userPassword = req.body.password;
  var num = 0;
  console.log(userName)
  console.log(userPassword)

  var db = require("../db");
  
  var Users = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  var user = new Users({ "username": userName, "password":
userPassword, status: 0});
console.log(user)
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          res.redirect("userlist");

          console.log(user)
          // res.redirect("userlist");
      }
  });
});


router.post('/login', async function (req, res) {
  var db = require("../db");
  var Users = await db.Mongoose.model('userslist', db.UserSchema,
      'userslist');
  var userName = req.body.username;
  var userPassword = req.body.password;
  await Users.find({ "username": userName, "password": userPassword }, (err, users) => {
      if (users.length) {
          res.json(users);
          res.end();
      } else {
          res.json();
          res.end();
      }
  });
});


/* GET ONE users. */
router.get('/user/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  User.find({ _id: req.params.id }).lean().exec(function (e,
docs) {
      res.json(docs);
      res.end();
  });
});


/* POST ONE users. */
router.post('/users/', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  var newuser = new User({ username: req.body.name, password:
req.body.password });
  newuser.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newuser);
      res.end();
  });
});


/* PUT ONE user. */
router.put('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  User.findOneAndUpdate({ _id: req.params.id }, req.body,
{ upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});


/* DELETE ONE user. */
router.delete('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('userslist',
db.UserSchema, 'userslist');
  User.find({ _id: req.params.id }).remove(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json({success: true});
      res.end();
  });
});


//***********USERS**********//



//***********CITY/WEATHER**********//////////////////////////////////////////////////

let cidade = 'Miami';


/* GET Place. */
router.post('/place', function (req, res, next) {
  // console.log(req)
  console.log(req.body)

  let cidade = req.body.City;
  console.log(cidade)

 
let url = `http://api.weatherstack.com/current?access_key=f18a154e8af2d05014336d0c78ea763f&query=${cidade}`
let dados ='';
 
// *REQUEST* connect to external api
request(url, function (err, response, body) {
 if(err){
  console.log('error:', error);
 } else {
 let weather = JSON.parse(body);

 if(typeof weather !== "undefined"){

 

 //dados = 'Dados Metereológicos para a ${location.name}: -Temperatura: ${current.temperature}ºC%'
 if(typeof weather.location !== "undefined"){
 local = weather.location
 hora = weather.location.localtime
 temperatura = weather.current.temperature
 tempo = weather.current.temperature
 icon = weather.current.weather_icons
 current = weather.current
 icon=current.weather_icons

cityname=local.name
description = weather.current.weather_descriptions
wind = weather.current.wind_speed
uv = weather.current.uv_index
day = weather.current.is_day

 }
 console.log(icon)

 recjson = ({
   temperature: temperatura,
   city: cityname,
   weather_description: description,
   windspeed: wind,
   uv_index: uv,
   is_day: day
 })

 jsontosend = ({obj1:current,obj2:icon, obj3:cityname})
 delete current['weather_icons'];

 icon = undefined;
 current = JSON.parse(JSON.stringify(current));

 dados = "Local: "+ local+ "; Hora: "+ hora
 console.log(jsontosend);
 console.log(current);

 console.log(weather)
 console.log("*"*30);

 console.log(recjson);

// *GET* weather page
 router.get('/weather', function(req, res, next){
  res.send(jsontosend);
});

// *GET* city page
router.get('/city', function(req, res, next){
  res.send(local);
});

// *GET* recommendations page
router.get('/recommendations', function(req, res, next){
  res.send(recjson);
});

   }}
});
});













/* GET Place. */
router.post('/forecast', function (req, res, next) {
  // console.log(req)
  console.log(req.body)

  let cidade = req.body.City;
  console.log(cidade)

 
let url = `http://api.weatherstack.com/forecast?access_key=f18a154e8af2d05014336d0c78ea763f&query=${cidade}&forecast_days=7`
let dados ='';
 
// *REQUEST* connect to external api
request(url, function (err, response, body) {
 if(err){
  console.log('error:', error);
 } else {
 let weather = JSON.parse(body);
 //dados = 'Dados Metereológicos para a ${location.name}: -Temperatura: ${current.temperature}ºC%'
 local = weather.location
 hora = weather.location.localtime
 temperatura = weather.current.temperature
 tempo = weather.current.weather_descriptions
 icon = weather.current.weather_icons
 current = weather.current
 icon=current.weather_icons

 console.log(tempo)
 console.log(tempo.includes("cloud"))

 if (tempo.includes("sun")){
   var icon = "https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F455426581041768615%2F&psig=AOvVaw2_NvLkgUL3pnbW1fBDJOGd&ust=1604458151567000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCz7sOu5ewCFQAAAAAdAAAAABAW"
 }
 if( tempo.indexOf("cloud") > -1 ) {
   console.log("oieeeeeeeee")
    var icon = "https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fgifer.com%2Fen%2Fsp&psig=AOvVaw0vIRKh9laKqmRDdiQaHue_&ust=1604458757337000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiYneiw5ewCFQAAAAAdAAAAABA1"
 }
 else if (tempo.includes("cloud")){
  var icon = "https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fgifer.com%2Fen%2Fsp&psig=AOvVaw0vIRKh9laKqmRDdiQaHue_&ust=1604458757337000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiYneiw5ewCFQAAAAAdAAAAABA1"
}
 console.log(icon)

 jsontosend = ({obj1:current,obj2:icon})
 delete current['weather_icons'];

 icon = undefined;
 current = JSON.parse(JSON.stringify(current));

 dados = "Local: "+ local+ "; Hora: "+ hora
 console.log(jsontosend);
 console.log(current);
 console.log(tempo);

 console.log(weather)

// *GET* weather page
 router.get('/weather', function(req, res, next){
  res.send(jsontosend);
});

// *GET* city page
router.get('/city', function(req, res, next){
  res.send(local);
});

   }
});
});

module.exports = router;





//https://medium.com/@jootorres_11979/integra%C3%A7%C3%A3o-de-api-usando-dedos-meteorol%C3%B3gicos-com-node-js-dc3c383af030