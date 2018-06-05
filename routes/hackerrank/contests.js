/**
 * Created by koteswarao on 04-06-2018.
 */

/*
 * When this route is matched a call will be made to get_contests in ../../api/codeforces/get_contests
 * There in that file everything is done from retrieving content to parsing it.
 * When it's job is done it runs the callback function it gets from the routes below.
 */

var express = require('express');
var router = express.Router();
var contests = require('../../api/hackerrank/get_contests');

router.get('/', function (req, res, next) {
    contests(res, callback);
});

function callback(res, resp) {
    res.json(resp);
}

/*
 * Below router is for setting limit to past contests
 */

router.get('/past/:limit', function (req, res, next) {

    var limit = req.params.limit;

    /*
     * Here past contests fetched are not recent, they are fetched from beginning of time.
     * So here we have to take last ${limit} contests to get the recent ones.
     */

    contests(res, callback, limit);
});

module.exports = router;