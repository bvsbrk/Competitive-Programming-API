/**
 * Created by koteswarao on 31-05-2018.
 */

/*
 * When this route is matched a call will be made to get_contests in ../../api/codechef/get_contests
 * There in that file everything is done from fetching content to scraping it.
 * When it's job is done it runs the callback function it gets from the routes below.
 */


var express = require('express');
var router = express.Router();

var contests = require('../../api/codechef/get_contests');

router.get('/', function (req, res, next) {

    contests(res, callback);

});


function callback(resp, res) {
    res.json(resp);
}

/* Below router is for setting limit to past contests */
router.get('/past/:limit', function (req, res, next) {

    var limit = req.params.limit;
    contests(res, callback, limit);

});


module.exports = router;