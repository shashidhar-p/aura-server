'use strict';
const CONFIG = require('../config');

module.exports = function (sequelize, Sequelize) {
    const Event = sequelize.define('Event', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT},
        poster: {type: Sequelize.STRING},
        name: {type: Sequelize.STRING},
        description: {type: Sequelize.STRING},
        oneliner: {type: Sequelize.STRING},
        category: {type: Sequelize.STRING},
        minTeamSize: {type: Sequelize.STRING},
        maxTeamSize: {type: Sequelize.STRING},
        registrationLimit: {type: Sequelize.STRING},
        club: {type: Sequelize.STRING},
        coords: {type: Sequelize.STRING},
        rounds: {type: Sequelize.STRING},
        status:
            {type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active'}
    });
    Event.associate = function(models) {
    };
    return Event;
};
