/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.status(400);
    res.json({
        status: 400,
        message: "Bad request. Contest name required"
    });
});

router.get('/:contest_name', function (req, res, next) {
    res.send("Leaderboard of " + req.params.contest_name + " comes here");
});

module.exports = router;
