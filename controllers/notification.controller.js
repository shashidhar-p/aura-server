const CONFIG = require('../config');
const models = require('../models/index');
const {to, ReE, ReS } = require('../services/utils.service');

const create = function (req, res) {
    models.Notif.create({
        createdby: req.body.createdby,
        title: req.body.title,
        description: req.body.description,
        audience: req.body.audience,
        type: req.body.type,
    }).then(notif => ReS(res, notif, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.create = create;

const update = function (req, res) {
    models.Notif.update({
        createdby: req.body.createdby,
        title: req.body.title,
        description: req.body.description,
        audience: req.body.audience,
        type: req.body.type,
    },{
        where: {id: req.params.id}
    }).then(notif => ReS(res, notif, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.update = update;

const remove = function (req, res) {
    models.Notif.destroy({
        where: {id: req.params.id}
    }).then(notif => ReS(res, notif, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.remove = remove;

const getAll = function (req, res) {
    models.Notif.findAll()
        .then(notif => ReS(res, notif, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.getAll = getAll;

const getOne = function (req, res) {
    models.Notif.findOne({
        where: {id: req.params.id}
    }).then(notif => ReS(res, notif, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.getOne = getOne;

