var request = require('request');
var urls = require('../../urls');

module.exports = function (res, callback, limit) {
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
            resp = parse(body['result'], limit);
        }
        callback(res, resp);
    });
};

function parse(body, limit) {
    var ret = {
        live: [],
        future: [],
        past: []
    };
    body.forEach(function (cur) {
        var json = {};
        json['platform'] = "codeforces";
        json['code'] = cur['id'];
        json['name'] = cur['name'];
        json['duration'] = cur['durationSeconds'];
        json['start'] = cur['startTimeSeconds'];
        json['end'] = cur['startTimeSeconds'] + cur['durationSeconds'];
        if (cur['phase'] === "CODING") ret.live.push(json);
        else if (cur['phase'] === "BEFORE") ret.future.push(json);
        else {
            /*
             * First check if limit is undefined or not
             * If limit parameter is not passed it would be undefined.
             */
            if (typeof limit !== 'undefined') {
                if (limit > 0) ret.past.push(json);
                limit -= 1;
            } else ret.past.push(json);
        }
    });
    return ret;
}