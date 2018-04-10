import {digestPassword} from "./crypto";

let Sequelize = require('sequelize');

let url = process.env.DATABASE_URL || "sqlite:./../db/db.db";

export let sequelize = new Sequelize(url);

export let User = sequelize.define('user', {

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
            this.setDataValue('password', digestPassword(password));
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
    token: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "Token must not be empty."}},
    },

});

export let New = sequelize.define('new', {

    // No author and date. It's created by default
    title: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "Title must not be empty."}},
    },
    content: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "Content must not be empty."}},
    },

});

New.belongsTo(User, {foreignKey: 'authorId'});
User.hasMany(New, {as: 'author', foreignKey: 'authorId'});

