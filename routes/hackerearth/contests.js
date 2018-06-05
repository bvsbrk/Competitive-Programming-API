/**
 * Created by koteswarao on 01-06-2018.
 */

/*
 * When this route is matched a call will be made to get_contests in ../../api/codeforces/get_contests
 * There in that file everything is done from retrieving content to parsing it.
 * When it's job is done it runs the callback function it gets from the routes below.
 */

var express = require('express');
var router = express.Router();
var contests = require('../../api/hackerearth/get_contests');

router.get('/', function (req, res, next) {
    contests(res, callback);
});

function callback(res, resp) {
    res.json(resp);
}

/*
 * The below router is for setting past contests limit
 */

router.get('/past/:limit', function (req, res, next) {

    var limit = req.params.limit;
    contests(res, callback, limit);

});

module.exports = router;