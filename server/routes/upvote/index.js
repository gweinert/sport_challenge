const express           = require('express')
const router            = express.Router()
const multer            = require('multer')
const upvote            = require('../../upvote')
const isAuthenticated   = require('../auth/index');
const upload            = multer()

router.post(
    '/challenge/:id', 
    // isAuthenticated, 
    upload.none(),
    upvote.challenge
)

router.post(
    '/reply/:challengeId/:id',
    upload.none(),
    upvote.reply
)

// router.get('/reply/:challengeId/:id', isAuthenticated, upvote.reply)

module.exports = router