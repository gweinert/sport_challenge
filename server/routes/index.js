const express       = require('express')
const router        = express.Router()
const passport      = require('passport')
const challenges    = require('./challenges')
const upvote        = require('./upvote')
const reply         = require('./reply')
const user          = require('./user')

// define the home page route
router.get('/', function (req, res) {
  res.send('Hello World!')
  console.log("session", req.session)
  console.log("user session", req.user)
})

router.use('/challenges', challenges)
router.use('/upvote', upvote)
router.use('/reply', reply)
router.use('/user', user)



// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
// router.get('/auth/facebook', (req, res, next) => {
//   console.log("are we here?");
//   next();
// }, passport.authenticate('facebook'), (req, res, next) => {
//   console.log("after auth??")
// });

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
// router.get('/auth/facebook/callback',
// (req, res, next) => { 
//   console.log("callbacl"); 
//   next();
// },
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));
router.get('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  function (req, res) {
    res.json({success: 1, user: req.user})
  }
);

router.get('/getUser', (req, res) => {
  if(req.user){
    res.json({success: 1, user: req.user, sessionID: req.sessionID})
  } else {
    res.json({success: 0, sessionID: req.sessionID})
  }
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router