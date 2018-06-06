var request = require('request');
request = request.defaults({jar: true});
var ical2json = require('ical2json');
var config = require('../../config');

module.exports = function (res, callback, limit) {
    request("https://www.hackerrank.com/calendar/cal.ics", function (err, response, body) {
        var json = ical2json.convert(body);
        var resp = parse(json['VCALENDAR'][0]['VEVENT'], limit);
        resp.hackerrank.past.reverse();
        if (typeof limit !== 'undefined') {
            var recent = [];
            for (var i = 0; i < Math.min(limit, resp.hackerrank.past.length); i++) {
                recent.push(resp.hackerrank.past[i]);
            }
            resp.hackerrank.past = recent;
            recent = [];
            for (i = 0; i < Math.min(limit, resp.topcoder.past.length); i++) {
                recent.push(resp.topcoder.past[i]);
            }
            resp.topcoder.past = recent;
        }
        callback(res, resp);
    })
};

function parse(received) {
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
                json['platform'] = "hackerrank";
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
                json['platform'] = "topcoder";
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