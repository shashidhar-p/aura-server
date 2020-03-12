'use strict';
const CONFIG = require('../config');

module.exports = function (sequelize, Sequelize) {
    const Club = sequelize.define('Club', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT},
        clubName: {type: Sequelize.STRING},
        clubCoords: {type: Sequelize.STRING},
        status:
            {type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active'}
    });
    Club.associate = function(models) {
    };
    return Club;
};
