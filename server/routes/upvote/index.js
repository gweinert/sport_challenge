const express = require('express')
const router = express.Router()
const upvote = require('../../upvote')

router.get('/challenge/:id', upvote.challenge)

router.get('/reply/:challengeId/:id', upvote.reply)

module.exports = router