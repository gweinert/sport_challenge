var multer  = require('multer')
var express = require('express')
var router = express.Router()
var challenge = require('../../challenge')

const maxSize = 2000000
var upload = multer({limits: { fileSize: maxSize }})

router.get('/', challenge.all)

router.post('/', 
    upload.single('Image'),
    challenge.create)

router.post('/edit', upload.none(), challenge.edit)

router.get('/remove/:challengeId', challenge.remove)

module.exports = router