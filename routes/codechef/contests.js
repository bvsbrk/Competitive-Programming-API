/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();


var request = require('request');
var config = require('../../urls');
var cheerio = require('cheerio');
var tableParser = require('cheerio-tableparser');

const jsdom = require("jsdom");
request = request.defaults({jar: true});

router.get('/', function (req, res, next) {
    var options = {
        url: config.codechef_contests,
        headers: config.codechef_header
    };

    request(options, function (error, response, body) {
        const dom = new jsdom.JSDOM(body);
        var resp = parseHtml(dom.window.document, res);
        res.json(resp);
    });
});

function parseHtml(document, res) {
    var tables = document.getElementsByClassName("dataTable");
    var live = tables[0];
    var future = tables[1];
    var past = tables[2];
    return {
        live: getContests(live),
        future: getContests(future),
        past: getContests(past)
    };
}

function toUnix(date_string) {
    var date = new Date(date_string);
    var unix = date.getTime() / 1000;
    return unix;
}


function getContests(table) {
    table = "<table>" + table.innerHTML + "</table>";
    $ = cheerio.load(table);
    tableParser($);
    var data = $("table").parsetable(false, false, true);
    console.log(data);
    var ret = [];
    for (var i = 1; i < data[0].length; i++) {
        var json = {};
        json['code'] = data[0][i];
        json['name'] = data[1][i];
        json['start'] = toUnix(data[2][i]);
        json['end'] = toUnix(data[3][i]);
        json['duration'] = json['end'] - json['start'];
        ret.push(json);
    }
    return ret;
}
module.exports = router;