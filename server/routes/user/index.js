const express = require('express')
const router = express.Router()
const user = require('../../user')

router.get('/', user.all)
router.get('/leaderboard', user.leaderboard)

module.exports = router