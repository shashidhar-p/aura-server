var checksum = require('../services/checksum');
var express = require('express');
var router = express.Router();

router.get('', function (req, res) {
    console.log("in pgdirect");
    console.log("--------testtxnjs----");
    res.render('pgredirect.ejs');
});
module.exports = router;