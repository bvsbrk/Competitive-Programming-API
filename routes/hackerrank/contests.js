/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();


var request = require('request');
var urls = require('../../urls');

request = request.defaults({jar: true});

router.get('/', function (req, res, next) {
    var options = {
        url: "https://www.codechef.com/contests",
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Connection": "keep-alive",
            "DNT": 1,
            "Host": "www.codechef.com",
            "Upgrade-Insecure-Requests": 1,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0"
        }
    };

    request(options, function (error, response, body) {
        console.log(response);
        res.send(body);
    });
});


module.exports = router;
