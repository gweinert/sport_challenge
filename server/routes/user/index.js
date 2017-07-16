const express = require('express')
const router = express.Router()
const user = require('../../user')

router.get('/', user.all)

module.exports = router