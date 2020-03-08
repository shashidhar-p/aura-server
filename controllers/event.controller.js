const CONFIG = require('../config');
const models = require('../models/index');
const {to, ReE, ReS } = require('../services/utils.service');
const asyncRoute = route => (req, res, next = console.error) =>
    Promise.resolve(route(req, res)).catch(next);

const create = function (req, res) {
    models.Event.create({
        poster: req.files['poster'][0].filename,
        name: req.body.name,
        description: req.body.description,
        oneliner: req.body.oneliner,
        category: req.body.category,
        minTeamSize: req.body.minTeamSize,
        maxTeamSize: req.body.maxTeamSize,
        registrationLimit: req.body.registrationLimit,
        club: req.body.club,
        coords: req.body.coords,
        rounds: req.body.rounds,
    }).then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.create = create;

const update = function (req, res) {
    models.Event.update({
        name: req.body.name,
        description: req.body.description,
        oneliner: req.body.oneliner,
        category: req.body.category,
        minTeamSize: req.body.minTeamSize,
        maxTeamSize: req.body.maxTeamSize,
        registrationLimit: req.body.registrationLimit,
        club: req.body.club,
        coords: req.body.coords,
        rounds: req.body.rounds,
    },{
        where: {id: req.params.id}
    }).then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.update = update;

const remove = function (req, res) {
    models.Event.destroy({
        where: {id: req.params.id}
    }).then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.remove = remove;

const getAll = function (req, res) {
    models.Event.findAll()
        .then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.getAll = getAll;

const getOne = function (req, res) {
    models.Event.findOne({
        where: {id: req.params.id}
    })
        .then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.getOne = getOne;

const updatePoster = function (req, res) {
    models.Event.update({
        poster: req.files['poster'][0].filename,
    },{
        where: {id: req.params.id}
    }).then(coord => ReS(res, coord, 200))
        .catch(err => ReE(res, err, 422));
};
module.exports.updatePoster = updatePoster;

const clubs = ['dance', 'dramatics', 'fashion', 'finearts', 'literary', 'music', 'quiz', 'photography', 'specials'];

const clubWiseList = async function(req, res) {
    let responseBody = [];

    for (let i=0;i<clubs.length;i++) {
        let temp = {};
        temp[clubs[i]] = await models.Event.findAll({where: {club: clubs[i]}});
        responseBody.push(temp);
    }
    ReS(res, responseBody, 200);
};
module.exports.clubWiseList = clubWiseList;
