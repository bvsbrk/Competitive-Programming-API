/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
const cheerio = require('cheerio');
var config = require('../../urls');

router.get('/', function (req, res, next) {

    fetch_html(res);

});

function fetch_html(res) {
    request(config.hackerrank_contests, function (error, response, body) {
        fetch_contests(res, body);
    });
}

var fetch_contests = function (res, body) {
    res.send(body);
};

module.exports = router;
