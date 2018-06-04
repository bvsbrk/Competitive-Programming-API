/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();


var request = require('request');
var urls = require('../../urls');
var config = require('../../config');

request = request.defaults({jar: true});

router.get('/', function (req, res, next) {

    var options = {
        url: urls.csacademy_contests,
        headers: urls.csacademy_header
    };

    request(options, function (error, response, body) {
        body = JSON.parse(body);
        var resp = parse(body['state']['Contest']);

        /* past contests are not fetched in recent order. So reversing the list helps*/

        resp.past.reverse();
        res.json(resp);
    });

});

/*
 * The below route is for setting limit to past contests
 */

router.get('/past/:limit', function (req, res, next) {


    var limit = req.params.limit;

    var options = {
        url: urls.csacademy_contests,
        headers: urls.csacademy_header
    };

    request(options, function (error, response, body) {
        body = JSON.parse(body);
        var resp = parse(body['state']['Contest']);
        /*
         * Here past contests are not fetched in recent order
         * They are fetched from beginning. So reverse the array that's it.
         */
        if (typeof limit !== 'undefined') {
            var recent = [];
            for (var i = 0; i < Math.min(limit, resp.past.length); i++) {
                recent.push(resp.past[resp.past.length - i - 1]);
            }
            resp.past = recent;
        }
        res.json(resp);
    });

});

function parse(contest_array) {
    var resp = {
        live: [],
        future: [],
        past: []
    };
    contest_array.forEach(function (cur) {
        var json = {};
        if (!(cur['startTime'] === null || cur['endTime'] === null)) {
            var cur_time = config.normal_to_unix((new Date()).toDateString());
            var contest_start = cur['startTime'];
            var contest_end = cur['endTime'];
            json['code'] = cur['name'];
            json['name'] = cur['longName'];
            json['start'] = cur['startTime'];
            json['end'] = cur['endTime'];
            json['duration'] = json['end'] - json['start'];
            if (cur_time < contest_start) resp.future.push(json);
            else if (cur_time >= contest_start && cur_time <= contest_end) resp.live.push(json);
            else resp.past.push(json);
        }
    });
    return resp;
}


module.exports = router;
