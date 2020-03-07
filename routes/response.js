var checksum = require('../services/checksum');
var config = require('../config');
const models = require("../models/index");
var express = require('express');
var router = express.Router();

router.post('', function (req, res) {
    console.log("in response post");
    var paramlist = req.body;
    var paramarray = new Array();
    console.log(paramlist);
    if (checksum.verifychecksum(paramlist, config.PAYTM_MERCHANT_KEY)) {
        if (paramlist.STATUS === 'TXN_SUCCESS') {
            models.User.update({
                    status: 'active'
                },
                {where: {invoice_id: paramlist.ORDERID}})
                .then(user => {
                    console.log(user);
                })
                .catch(error => console.log(error));
        }
        console.log("true");
        res.redirect("http://aura.git.edu/profile/" + paramlist.ORDERID);
    } else {
        console.log("false");
        res.render('response.ejs', {'restdata': "false", 'paramlist': paramlist});
    }
});
module.exports = router;