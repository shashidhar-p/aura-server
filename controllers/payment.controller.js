const models = require("../models/index");
const {to, ReE, ReS} = require("../services/utils.service");
var checksum = require('../services/checksum');
var config = require('../config');

async function pay(req, res) {
    console.log("POST Registration start");
    // generate order_id and cust_id
    let order_id = await getOrderId();
    let user = await models.User.update({
        invoice_id: order_id,
    },{
        where: {
            id: req.body.userId,
        }
    });
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
}

async function getOrderId(name) {
    let nameSegment = name.replace(/\s/g, "");
    let rng = Math.floor(Math.random() * 999 + 1);
    return order_id = 'AURA-' + nameSegment.substring(0,3) + rng;
}