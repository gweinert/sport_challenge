const express = require('express')
const router = express.Router()
const upvote = require('../../upvote')
var isAuthenticated = require('../auth/index');


router.get('/challenge/:id', isAuthenticated, upvote.challenge)

router.get('/reply/:challengeId/:id', isAuthenticated, upvote.reply)

module.exports = router