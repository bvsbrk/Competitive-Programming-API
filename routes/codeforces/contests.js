/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var urls = require('../../urls');

router.get('/', function (req, res, next) {
    var options = {
        url: urls.codeforces_contests
    };
    request(options, function (error, response, body) {
        var resp = {
            live: [],
            future: [],
            past: []
        };
        body = JSON.parse(body);
        if (body['status'] === "OK") {
            resp = parse(body['result']);
        }
        res.json(resp);
    });
});

function parse(body) {
    var ret = {
        live: [],
        future: [],
        past: []
    };
    body.forEach(function (cur) {
        var json = {};
        json['code'] = cur['id'];
        json['name'] = cur['name'];
        json['duration'] = cur['durationSeconds'];
        json['start'] = cur['startTimeSeconds'];
        json['end'] = cur['startTimeSeconds'] + cur['durationSeconds'];
        if (cur['phase'] === "CODING") ret.live.push(json);
        else if (cur['phase'] === "BEFORE") ret.future.push(json);
        else ret.past.push(json);
    });
    return ret;
}


module.exports = router;
