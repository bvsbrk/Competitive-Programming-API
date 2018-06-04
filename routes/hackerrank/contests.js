/**
 * Created by koteswarao on 04-06-2018.
 */

var express = require('express');
var router = express.Router();

var request = require('request');
request = request.defaults({jar: true});
var ical2json = require('ical2json');
var config = require('../../config');


router.get('/', function (req, res, next) {
    request("https://www.hackerrank.com/calendar/cal.ics", function (err, resp, body) {
        var json = ical2json.convert(body);
        var resp = parse(json['VCALENDAR'][0]['VEVENT']);
        resp.hackerrank.past.reverse();
        res.json(resp);
    })
});

/*
 * Below router is for setting limit to past contests
 */

router.get('/past/:limit', function (req, res, next) {

    var limit = req.params.limit;

    /*
     * Here past contests fetched are not recent, they are fetched from beginning of time.
     * So here we have to take last ${limit} contests to get the recent ones.
     */

    request("https://www.hackerrank.com/calendar/cal.ics", function (err, resp, body) {
        var json = ical2json.convert(body);
        var resp = parse(json['VCALENDAR'][0]['VEVENT'], limit);
        if (typeof limit !== 'undefined') {
            var recent = [];
            for (var i = 0; i < Math.min(limit, resp.hackerrank.past.length); i++) {
                recent.push(resp.hackerrank.past[resp.hackerrank.past.length - i - 1]);
            }
            resp.hackerrank.past = recent;
            recent = [];
            for (i = 0; i < Math.min(limit, resp.topcoder.past.length); i++) {
                recent.push(resp.topcoder.past[resp.topcoder.past.length - i - 1]);
            }
            resp.topcoder.past = recent;
        }
        res.json(resp);
    })
});

function parse(received, limit) {
    var resp = {
        hackerrank: {
            live: [],
            future: [],
            past: []
        },
        topcoder: {
            live: [],
            future: [],
            past: []
        }
    };
    received.forEach(function (cur) {
        var json = {};
        if (cur['LOCATION']) {
            if (cur['LOCATION'].includes("hackerrank")) {
                json['start'] = config.ics_to_unix(cur['DTSTART']);
                json['end'] = config.ics_to_unix(cur['DTEND']);
                json['duration'] = json['end'] - json['start'];
                json['name'] = cur['SUMMARY'];
                json['link'] = cur['LOCATION'];
                var cur_time = config.normal_to_unix((new Date()).toDateString());
                if (cur_time < json['start']) resp.hackerrank.future.push(json);
                else if (json['start'] < cur_time && cur_time < json['end']) resp.hackerrank.live.push(json);
                else resp.hackerrank.past.push(json);
            }
            else if (cur['LOCATION'].includes("topcoder")) {
                json['start'] = config.ics_to_unix(cur['DTSTART']);
                json['end'] = config.ics_to_unix(cur['DTEND']);
                json['duration'] = json['end'] - json['start'];
                json['name'] = cur['SUMMARY'];
                json['link'] = cur['LOCATION'];
                var cur_time = config.normal_to_unix((new Date()).toDateString());
                if (cur_time < json['start']) resp.topcoder.future.push(json);
                else if (json['start'] < cur_time && cur_time < json['end']) resp.topcoder.live.push(json);
                else resp.topcoder.past.push(json);
            }
        }
    });
    return resp;
}

module.exports = router;