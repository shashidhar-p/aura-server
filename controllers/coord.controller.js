const CONFIG = require('../config');
const models = require('../models/index');
const {to, ReE, ReS } = require('../services/utils.service');
const authService = require('../services/auth.service');

const create = function (req, res) {
    let hash = authService.getHash(req.body.coordPassword);
    // console.log("REQUEST:" + JSON.stringify(req));
    models.Coord.create({
        image: req.files['image'][0].filename,
        coordName: req.body.coordName,
        coordContact: req.body.coordContact,
        coordEmail: req.body.coordEmail,
        coordUsn: req.body.coordUsn,
        coordUid: req.body.coordUid,
        coordPassword: hash,
        coordRole: req.body.coordRole,
    }).then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.create = create;

const update = function (req, res) {
    models.Coord.update({
        image: '',
        coordName: req.body.coordName,
        coordContact: req.body.coordContact,
        coordEmail: req.body.coordEmail,
        coordUsn: req.body.coordUsn,
        coordUid: req.body.coordUid,
        coordRole: req.body.coordRole,
    },{
        where: {id: req.params.id}
    }).then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.update = update;

const remove = function (req, res) {
    models.Coord.destroy({
        where: {id: req.params.id}
    }).then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.remove = remove;

const getAll = function (req, res) {
    models.Coord.findAll()
        .then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.getAll = getAll;

const getOne = function (req, res) {
    models.Coord.findOne({
        where: {id: req.params.id}
    })
        .then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.getOne = getOne;

const getByPh = function (req, res) {
    models.Coord.findOne({
        where: {coordContact: req.params.contact}
    })
        .then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.getByPh = getByPh;
