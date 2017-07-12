const express           = require('express')
const session           = require('express-session')
const bodyParser        = require('body-parser')
const fs                = require('fs')
const secrets           = require("./secrets.json")
const MongoClient       = require('mongodb').MongoClient
const assert            = require('assert')
const passport          = require('passport')
var FacebookTokenStrategy = require('passport-facebook-token');
const routes            = require('./routes')

const app = express()
const dbUrl = "mongodb://localhost:27017/snow_challenge"
var db
 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session(
  { 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000,secure: false, httpOnly: false
    }
  }
))
app.use(passport.initialize());
app.use(passport.session());

// Make our db accessible to our router
app.use( (req,res,next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    req.db = db
    req.assert = assert
    next();
});

app.use('/', routes)


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.collection('users').findOne({ _id: id }, function(err, doc) {
      done(err, doc)
    });
});


 
passport.use(new FacebookTokenStrategy({
    clientID: secrets.facebook.appID,
    clientSecret: secrets.facebook.appSecret
  }, function(accessToken, refreshToken, profile, done) {

    db.collection('users').findOne(
      { _id: profile.id }, 
      
      function(err, doc) {
        
        if(doc == null) {
          
          db.collection('users').insertOne({
            _id: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
            createdChallenges: [],
            replies: [],
            profileImg: profile.photos[0].value,
            score: {
              totalPoints: 0,
              points: []
            }
          }, function(err, r) {
                
                assert.equal(null, err);
                // req.assert.equal(1, r.matchedCount);
                // req.assert.equal(1, r.modifiedCount);
                console.log(`added new user with id ${profile.id}`)
                done(err, profile)
            
            }
          )
        } else {
          console.log("user exists..done.")
          done(err, doc)
        }
      }
     )
  }
));


MongoClient.connect(dbUrl, (err, database) => {
  if (err) return console.log(err)
  assert.equal(null, err);
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

