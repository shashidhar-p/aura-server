const CONFIG = require('../config');
const models = require('../models/index');
const authService = require('../services/auth.service');
const userService = require("../services/auth.service");
const Role = require("../_helpers/role");
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

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => {user ? ReS(res, user, 200) : ReE(res, { message: 'Username or password is incorrect' }, 422)})
        .catch(err => next(err));
}
module.exports.authenticate = authenticate;

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
module.exports.getAll = getAll;

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
module.exports.getById = getById;

