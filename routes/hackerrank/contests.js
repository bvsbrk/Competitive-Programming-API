/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();


var request = require('request');
var urls = require('../../urls');

request = request.defaults({jar: true});

router.get('/', function (req, res, next) {
    res.send("Hackerrank contests appear here");
});


module.exports = router;
