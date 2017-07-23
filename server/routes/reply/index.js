var multer  = require('multer')
var express = require('express')
var router = express.Router()
var reply = require('../../reply')
const maxSize = 1e+7
var upload = multer({limits: { fileSize: maxSize }})
var isAuthenticated = require('../auth/index');


router.post('/',
    // isAuthenticated,
    upload.single('Reply'), 
    reply.create
)

router.post('/remove/:id', 
    // isAuthenticated,
    upload.none(),
    reply.remove
)

module.exports = router