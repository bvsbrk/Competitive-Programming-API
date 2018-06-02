/**
 * Created by koteswarao on 01-06-2018.
 */

var express = require('express');
var router = express.Router();


var request = require('request');
var urls = require('../../urls');

request = request.defaults({jar: true});

router.get('/', function (req, res, next) {
    var options = {
        url: urls.hackerearth_contests
    };
    request(options, function (error, response, body) {
        body = JSON.parse(body);
        var resp = {
            live: [],
            future: [],
            past: []
        };
        res.json(body);
    });
});


module.exports = router;