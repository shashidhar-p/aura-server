const CONFIG = require('../config');
const models = require('../models/index');
const authService = require('../services/auth.service');
const {to, ReE, ReS } = require('../services/utils.service');

const register = function (req, res) {
    let verification_code = authService.getVerificationCode();
    let hash = authService.getHash(req.body.password);
    models.User.create({
        name: req.body.name,
        uid: req.body.uid,
        usn: req.body.usn,
        email: req.body.email,
        phone: req.body.phone,
        college: req.body.college,
        password: hash,
        verification_code: verification_code,
        verified: false,
    }).then(user => ReS(res, user, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.register = register;

