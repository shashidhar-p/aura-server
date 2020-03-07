'use strict';

const CONFIG = require('../config.js');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const mysql = require('mysql2/promise');

const dbName = CONFIG.db_name;

// mysql.createConnection({
//     host: CONFIG.db_host,
//     port: CONFIG.db_port,
//     user     : CONFIG.db_user,
//     password : CONFIG.db_pass,
// }).then( connection => {
//     connection.query("CREATE DATABASE IF NOT EXISTS `"+dbName+"`;").then((res) => {
//         console.info("Database create or successfully checked");
//     })
// });

let sequelize;
sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_pass, {
    host: CONFIG.db_host,
    port: CONFIG.db_port,
    dialect: CONFIG.db_dialect,
    operatorsAliases: false,

    pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
});

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) &&
            (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;