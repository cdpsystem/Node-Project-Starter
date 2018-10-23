'use strict'

let express = require('express');
let router = express.Router();

let TestController = require('../controllers/test');

router.get('/test',TestController.home);

module.exports = router;