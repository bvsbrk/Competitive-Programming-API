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
