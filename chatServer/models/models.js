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

function selectChatTable(chatId) {

    let table = sequelize.define(chatId, {
        author: {
            type: Sequelize.INTEGER,
            validate: {notEmpty: {msg: "Sender must not be empty."}},
        },
        date: {
            type: Sequelize.DATE,
            validate: {notEmpty: {msg: "Date must not be empty."}},
        },
        message: {
            type: Sequelize.STRING,
        },
        read: {
            type: Sequelize.BOOLEAN,

        },
        thread: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: false,
    });

    return table;

}

exports.User = User;
exports.selectChatTable = selectChatTable;
exports.sequelize = sequelize;
