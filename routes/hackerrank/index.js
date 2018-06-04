/**
 * Created by koteswarao on 04-06-2018.
 */


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('hackerrank index');
});


module.exports = router;