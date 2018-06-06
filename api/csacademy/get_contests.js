var request = require('request');
var urls = require('../../urls');
var config = require('../../config');
var cache = require('memory-cache');

request = request.defaults({jar: true});

module.exports = function (res, callback, limit) {

    var cached = cache.get(config.csacademy_contests_cache);
    if (cached == null) {
        var options = {
            url: urls.csacademy_contests,
            headers: urls.csacademy_header
        };
        request(options, function (error, response, body) {
            body = JSON.parse(body);
            var resp = parse(body['state']['Contest'], limit);

            /* past contests are not fetched in recent order. So reversing the list helps*/
            resp.past.reverse();

            if (typeof limit !== 'undefined') {
                var recent = [];
                for (var i = 0; i < Math.min(limit, resp.past.length); i++) {
                    recent.push(resp.past[i]);
                }
                resp.past = recent;
            }

            cache.put(config.csacademy_contests_cache, resp, config.cache_duration);
            callback(res, resp);

        });
    } else callback(res, cached);
};

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
            json['platform'] = "csacademy";
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