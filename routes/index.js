var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function (req, res, next) {
    fs.readFile(__dirname + "/../public/wiki.html", "utf8", function (err, resp) {
        res.send(resp);
    });
});

module.exports = router;
