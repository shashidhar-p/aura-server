const config = require('../config.js');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');
const models = require('../models/index');
const crypto = require('crypto');
const {to} = require('../services/utils.service');
// users hardcoded for simplicity, store in a db for production applications
// const users = [
//     {id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin},
//     {id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User}
// ];

async function getUsersFromDB() {
    return models.User.findAll();
}

async function validPassword(dbpassword, password) {
    var hash = crypto.pbkdf2Sync(password,
        config.pw_salt, 1000, 64, `sha512`).toString(`hex`);
    return dbpassword === hash;
}
module.exports.validPassword = validPassword;

function getVerificationCode() {
    return Math.floor(Math.random() * 999999 + 1);
}

module.exports.getVerificationCode = getVerificationCode;

function getHash(password) {
    let hash = crypto.pbkdf2Sync(password, config.pw_salt,
        1000, 64, `sha512`).toString(`hex`);
    return hash;
}

module.exports.getHash = getHash;

async function authenticate({username, password}) {
    const user = await models.User.findOne({where: {email: username}});
    console.log(user.name);
    const result = await validPassword(user.password, password);

    if (result) {
        const token = jwt.sign({sub: user.id, role: user.role}, config.secret);
        // const token = jwt.sign({sub: user.id, role: "Admin"}, config.secret);
        return {
            user,
            token
        };
    }
}
module.exports.authenticate = authenticate;

async function getAll() {
    return getUsersFromDB();
}

module.exports.getAll = getAll;

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
}

module.exports.getById = getById;
