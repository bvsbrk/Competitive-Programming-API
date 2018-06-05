var request = require('request');
var urls = require('../../urls');
var config = require('../../config');

request = request.defaults({jar: true});

module.exports = function (res, callback, limit) {
    var options = {
        url: urls.hackerearth_contests
    };
    request(options, function (error, response, body) {
        body = JSON.parse(body);
        var resp = parse(body.response, limit);
        callback(res, resp);
    });
};

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