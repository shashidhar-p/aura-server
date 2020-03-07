'use strict';
const CONFIG = require('../config');

module.exports = function (sequelize, Sequelize) {
    const Notif = sequelize.define('Notif', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT},
        createdby: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        description: {type: Sequelize.STRING},
        audience: {type: Sequelize.STRING},
        type: {type: Sequelize.STRING},
        status:
            {type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active'}
    });
    Notif.associate = function(models) {
    };
    return Notif;
};
