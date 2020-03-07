const express = require('express');
const router = express.Router();
const userService = require('../services/auth.service');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');
const {ReS, ReE} = require('../services/utils.service');

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
