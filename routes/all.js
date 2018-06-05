var express = require('express');
var router = express.Router();
var codechef = require('../api/codechef/get_contests');
var codeforces = require('../api/codeforces/get_contests');
var csacademy = require('../api/csacademy/get_contests');
var hackerearth = require('../api/hackerearth/get_contests');
var hackerrank = require('../api/hackerrank/get_contests');

var limit;
router.get('/:limit', function (req, res, next) {
    limit = req.params.limit;
    codechef(res, cc_callback, limit);
});

/* below route fetches all contests from all sites without imposing any limit. For that a limit of 10 ** 10 has been set */
router.get('/', function (req, res, next) {
    limit = Math.pow(10, 10);
    codechef(res, cc_callback, limit);
});

var cc_resp, cf_resp, cs_resp, hke_resp, hkr_resp;

function cc_callback(res, resp) {
    cc_resp = resp;
    codeforces(res, cf_callback, limit);
}

function cf_callback(res, resp) {
    cf_resp = resp;
    csacademy(res, cs_callback, limit);
}

function cs_callback(res, resp) {
    cs_resp = resp;
    hackerearth(res, hke_callback, limit);
}

function hke_callback(res, resp) {
    hke_resp = resp;
    hackerrank(res, hkr_callback, limit);
}

function hkr_callback(res, resp) {
    hkr_resp = resp;
    render_response(res);
}

function render_response(res) {
    var total = {
        live: [],
        future: [],
        past: []
    };
    total.live = total.live.concat(cc_resp.live);
    total.live = total.live.concat(cf_resp.live);
    total.live = total.live.concat(cs_resp.live);
    total.live = total.live.concat(hke_resp.live);
    total.live = total.live.concat(hkr_resp.hackerrank.live);
    total.live = total.live.concat(hkr_resp.topcoder.live);

    total.future = total.future.concat(cc_resp.future);
    total.future = total.future.concat(cf_resp.future);
    total.future = total.future.concat(cs_resp.future);
    total.future = total.future.concat(hke_resp.future);
    total.future = total.future.concat(hkr_resp.hackerrank.future);
    total.future = total.future.concat(hkr_resp.topcoder.future);

    total.past = total.past.concat(cc_resp.past);
    total.past = total.past.concat(cf_resp.past);
    total.past = total.past.concat(cs_resp.past);
    total.past = total.past.concat(hke_resp.past);
    total.past = total.past.concat(hkr_resp.hackerrank.past);
    total.past = total.past.concat(hkr_resp.topcoder.past);
    res.json(total);
}

module.exports = router;

/*
  codechef
  codeforces
  csacademy
  hackerearth
  hackerrank + topcoder

 */