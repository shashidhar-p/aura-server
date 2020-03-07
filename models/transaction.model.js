'use strict';
const CONFIG = require('../config');

module.exports = function (sequelize, Sequelize) {
    const TRANSACTION = sequelize.define('TRANSACTION', {
        ID: {autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT},
        TXNID: {type: Sequelize.STRING},
        ORDERID: {type: Sequelize.STRING},
        BANKTXNID: {type: Sequelize.STRING},
        TXNAMOUNT: {type: Sequelize.STRING},
        CURRENCY: {type: Sequelize.STRING},
        RESPCODE: {type: Sequelize.STRING},
        RESPMSG: {type: Sequelize.STRING},
        TXNDATE: {type: Sequelize.STRING},
        GATEWAYNAME: {type: Sequelize.STRING},
        BANKNAME: {type: Sequelize.STRING},
        PAYMENTMODE: {type: Sequelize.STRING},
        CHECKSUMHASH: {type: Sequelize.STRING},
        STATUS:
            {type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'inactive'}
    });
    TRANSACTION.associate = function(models) {
    };
    return TRANSACTION;
};
