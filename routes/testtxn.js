var checksum = require('../services/checksum');
var config = require('../config');
var express = require('express');
var router = express.Router();

router.get('', function (req, res) {
    console.log("in restaurant");
    console.log("--------testtxnjs----");
    res.render('testtxn.ejs', {'config': config});
});

router.post('', function (req, res) {
    console.log("POST Registration start");
    let rng = Math.floor(Math.random() * 999999 + 1);
    let order_id = 'AURA-' + rng;
    var paramlist = req.body;
    var paramarray = [];
    paramarray['ORDER_ID'] = order_id;
    paramarray['CUST_ID'] = order_id;
    paramarray['TXN_AMOUNT'] = '100.00';
    paramarray['MID'] = config.MID;
    paramarray['CHANNEL_ID'] = config.CHANNEL_ID;
    paramarray['INDUSTRY_TYPE_ID'] = config.INDUSTRY_TYPE_ID;
    paramarray['WEBSITE'] = config.WEBSITE;
    paramarray['CALLBACK_URL'] = config.CALLBACK_URL;  // in case if you want to send callback
    console.log(paramarray);
    checksum.genchecksum(paramarray, config.PAYTM_MERCHANT_KEY, function (err, result) {
        console.log(result);
        res.render('pgredirect.ejs', {'restdata': result});
    });
    console.log("POST Registration End");
});
module.exports = router;
