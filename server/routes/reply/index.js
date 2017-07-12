var multer  = require('multer')
var express = require('express')
var router = express.Router()
var reply = require('../../reply')
const maxSize = 1e+7
var upload = multer({limits: { fileSize: maxSize }})

router.post('/', 
    upload.single('Reply'), 
    reply.create)

module.exports = router