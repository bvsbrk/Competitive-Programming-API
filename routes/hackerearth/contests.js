/**
 * Created by koteswarao on 01-06-2018.
 */

var express = require('express');
var router = express.Router();


var request = require('request');
var urls = require('../../urls');
var config = require('../../config');

request = request.defaults({jar: true});

router.get('/', function (req, res, next) {
    var options = {
        url: urls.hackerearth_contests
    };
    request(options, function (error, response, body) {
        body = JSON.parse(body);
        var resp = parse(body.response);
        res.json(resp);
    });
});

/*
 * The below router is for setting past contests limit
 */

router.get('/past/:limit', function (req, res, next) {

    var limit = req.params.limit;

    var options = {
        url: urls.hackerearth_contests
    };
    request(options, function (error, response, body) {
        body = JSON.parse(body);
        var resp = parse(body.response, limit);
        res.json(resp);
    });
});

function parse(body, limit) {
    var resp = {
        live: [],
        future: [],
        past: []
    };
    body.forEach(function (cur) {
        var json = {};
        json['name'] = cur['title'];
        json['url'] = cur['url'];
        json['start'] = config.normal_to_unix(cur['start_utc_tz']);
        json['end'] = config.normal_to_unix(cur['end_utc_tz']);
        json['duration'] = json['end'] - json['start'];
        json['type'] = cur['challenge_type'];
        json['image_link'] = cur['cover_image'];
        if (cur['status'] === "ONGOING") resp.live.push(json);
        else if (cur['status'] === "UPCOMING") resp.future.push(json);
        else {
            if (typeof limit !== 'undefined') {
                if (limit > 0) resp.past.push(json);
                limit -= 1;
            } else resp.past.push(json);
        }
    });
    return resp;
}


module.exports = router;