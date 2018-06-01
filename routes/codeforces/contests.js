/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../../urls');

router.get('/', function (req, res, next) {
    var options = {
        url: config.codeforces_contests
    };
    request(options, function (error, response, body) {
        var resp=[];
        body = JSON.parse(body);
        if (body['status'] === "OK") {
            resp = parse(body['result']);
        } else {
            resp = [];
        }
        res.json(resp);
    });
});

function parse(body) {
    var ret = [];
    body.forEach(function (cur, idx) {
        var json = {};
        json['id'] = cur['id'];
        json['name'] = cur['name'];
        json['duration'] = cur['durationSeconds'];
        json['start'] = cur['startTimeSeconds'];
        json['end'] = cur['startTimeSeconds'] + cur['durationSeconds'];
        ret.push(json);
    });
    return ret;
}


module.exports = router;
