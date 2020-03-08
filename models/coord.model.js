'use strict';
const CONFIG = require('../config');

module.exports = function (sequelize, Sequelize) {
    const Coord = sequelize.define('Coord', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT},
        image: {type: Sequelize.STRING},
        coordName: {type: Sequelize.STRING},
        coordEmail: {type: Sequelize.STRING},
        coordContact: {type: Sequelize.STRING},
        coordUsn: {type: Sequelize.STRING},
        coordUid: {type: Sequelize.STRING},
        coordPassword: {type: Sequelize.STRING},
        coordRole: {type: Sequelize.STRING},
        status:
            {type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active'}
    });
    Coord.associate = function(models) {
    };
    return Coord;
};
