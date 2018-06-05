/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();

var contests = require('../../api/codechef/get_contests');

router.get('/', function (req, res, next) {

    contests(res, normal_callback);

});


function normal_callback(resp, res) {
    res.json(resp);
}

function past_limit_callback(resp, res, limit) {

    var required = [];
    for (var i = 0; i < Math.min(resp.past.length, limit); i++) required.push(resp.past[i]);
    resp.past = required;
    res.json(resp);

}

/* Below router is for setting limit to past contests */
router.get('/past/:limit', function (req, res, next) {

    var limit = req.params.limit;

    contests(res, past_limit_callback, limit);
});


module.exports = router;