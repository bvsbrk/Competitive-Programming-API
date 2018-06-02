/**
 * Created by koteswarao on 31-05-2018.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Hello hackerrank index');
});


module.exports = router;
