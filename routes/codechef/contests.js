/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();


var request = require('request');
var urls = require('../../urls');
var cheerio = require('cheerio');
var tableParser = require('cheerio-tableparser');
var config = require('../../config');

const jsdom = require("jsdom");
request = request.defaults({jar: true});

router.get('/', function (req, res, next) {
    var options = {
        url: urls.codechef_contests,
        headers: urls.codechef_header
    };

    request(options, function (error, response, body) {
        const dom = new jsdom.JSDOM(body);
        var resp = parseHtml(dom.window.document);
        res.json(resp);
    });
});


/*
 * The below route is for setting limit to past contests
 */
router.get('/past/:limit', function (req, res, next) {
    var options = {
        url: urls.codechef_contests,
        headers: urls.codechef_header
    };

    var limit = req.params.limit;

    request(options, function (error, response, body) {
        const dom = new jsdom.JSDOM(body);
        var resp = parseHtml(dom.window.document, 10);
        res.json(resp);
    });
});

function parseHtml(document, limit) {
    var tables = document.getElementsByClassName("dataTable");
    var live = tables[0];
    var future = tables[1];
    var past = tables[2];
    return {
        live: getContests(live),
        future: getContests(future),
        past: getContests(past, limit)
    };
}


function getContests(table, limit) {
    table = "<table>" + table.innerHTML + "</table>";
    $ = cheerio.load(table);
    tableParser($);
    var data = $("table").parsetable(false, false, true);
    var ret = [];
    /*
     * Codechef introduced rating system on 2nd may 2018
     * Therefore all contests before that date will have only one link
     * All contests after 2nd may 2018 will have 2 links one for div - A and one for div - B
     * 1st may in unix format is 1519896600
     * So if time is less than above unix time it will have only one link
     * Otherwise it will have two links div A and div B
     */

    /*
     * Check if limit is actually defined
     * If limit is not defined for loop iterates until the length of data
     * If limit is defined for loop iterates only until the limit is reached
     * The limit has also check one more thing that is limit should not increase actual length
     */


    limit = limit ? limit : Math.min(limit, data[0].length);
    for (var i = 1; i <= limit; i++) {
        var json = {};
        json['code'] = data[0][i];
        json['name'] = data[1][i];
        json['start'] = config.normal_to_unix(data[2][i]);
        json['end'] = config.normal_to_unix(data[3][i]);
        json['duration'] = json['end'] - json['start'];
        json['divA_link'] = json['start'] < 1519896600 ? "" : urls.codechef_contest_link.replace("contest_code", json['code'] + "A");
        json['divB_link'] = json['start'] < 1519896600 ? "" : urls.codechef_contest_link.replace("contest_code", json['code'] + "B");
        json['normal_link'] = urls.codechef_contest_link.replace("contest_code", json['code']);
        /*

         Normal link is given to all even though they are with rating
         This is to avoid invalid page links for non-codechef contests
         Normal page link is valid even for divisioned contests

         */
        ret.push(json);
    }
    return ret;
}
module.exports = router;