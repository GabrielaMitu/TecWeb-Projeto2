const { Db } = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/projeto2');



var postSchema = new mongoose.Schema({
    city: String,
    username: String,
    content: String,
    date: Date
}, { collection: 'postslist' }
);

var citySchema = new mongoose.Schema({
    city: String,
    username: String,
    content: String,
    date: Date
}, { collection: 'postscity' }
);

var userSchema = new mongoose.Schema({
    status: Number,
    favourites: Array,
    username: String,
    password: String
}, { collection: 'userslist' }
);




var activitiesSchema = new mongoose.Schema({
    city: String,
    username: String,
    content: String,
    date: Date
}, { collection: 'postsactivities' }
);





module.exports = { Mongoose: mongoose, UserSchema: userSchema, PostSchema: postSchema, CitySchema: citySchema, ActivitiesSchema: activitiesSchema  }




//projetoDois