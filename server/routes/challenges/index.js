var multer  = require('multer')
var express = require('express')
var router = express.Router()
var challenge = require('../../challenge')
var isAuthenticated = require('../auth/index');

const maxSize = 2000000
var upload = multer({limits: { fileSize: maxSize }})

router.get('/', challenge.all)

router.post('/',
    isAuthenticated,
    upload.single('Image'),
    challenge.create)

router.post('/edit', 
    isAuthenticated,
    upload.none(), 
    challenge.edit)

router.get('/remove/:challengeId', 
    isAuthenticated,
    challenge.remove)

module.exports = router