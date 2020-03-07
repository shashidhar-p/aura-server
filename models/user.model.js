'use strict';

const CONFIG = require('../config');

module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define('User', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT},
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('name', val.toUpperCase());
            }
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: true,
            set(val) {
                this.setDataValue('uid', val.toUpperCase());
            }
        },
        usn: {
            type: Sequelize.STRING,
            validate: {
                len: [8, 20],
                isAlphanumeric: true
            },
            allowNull: false,
            unique: true,
            set(val) {
                this.setDataValue('usn', val.toUpperCase());
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: {msg: "Email is invalid."}},
            set(val) {
                this.setDataValue('email', val.toUpperCase());
            }
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {args: [7, 20], msg: "Phone number invalid, too short."},
                isNumeric: {msg: "not a valid phone number."}
            }
        },
        college: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        verification_code: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
        },
        invoice_id: {
            type: Sequelize.STRING,
            unique: true
        },
        status:
            {type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'inactive'}
    });
    User.associate = function(models) {
    };
    return User;
};