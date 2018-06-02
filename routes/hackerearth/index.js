/**
 * Created by koteswarao on 01-06-2018.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('hackerearth index');
});


module.exports = router;