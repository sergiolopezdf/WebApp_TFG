// import {digestPassword} from '../crypto';

let crypto = require("../crypto");

let Sequelize = require('sequelize');

let url = process.env.DATABASE_URL || "sqlite:./../db/db.db";

let sequelize = new Sequelize(url);

let User = sequelize.define('user', {

    username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {notEmpty: {msg: "Username must not be empty."}},
    },

    name: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "Name must not be empty."}},
    },

    password: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "Password must not be empty."}},
        set(password) {
            this.setDataValue('password', crypto.digestPassword(password));
        },
    },

    admin: {
        type: Sequelize.BOOLEAN,
        validate: {notEmpty: {msg: "admin must not be empty."}},
    },
    online: {
        type: Sequelize.BOOLEAN,
        validate: {notEmpty: {msg: "User online must not be empty."}},
    },

});

// Exporting authorId as foreingKey. Then, importing it with the same name.
// 'as' is just for getters and setters

exports.User = User;

exports.sequelize = sequelize;
