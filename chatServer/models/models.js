// import {digestPassword} from '../crypto';

let crypto = require("../crypto");

let Sequelize = require('sequelize');

let url = processVideo.env.DATABASE_URL || "sqlite:./../db/db.db";

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
    token: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "Token must not be empty."}},
    },

});

let UnreadMessages = sequelize.define('unreadMessages', {

    chat: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "Chat must not be empty."}},
    },

    nMessages: {
        type: Sequelize.INTEGER,
        validate: {notEmpty: {msg: "nMessages must not be empty."}},
    },

}, {
    timestamps: false,
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
        thread: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: false,
    });

    return table;

}

UnreadMessages.belongsTo(User, {foreignKey: 'authorId'});
User.hasMany(UnreadMessages, {as: 'author', foreignKey: 'authorId'});

exports.User = User;
exports.UnreadMessages = UnreadMessages;
exports.selectChatTable = selectChatTable;
exports.sequelize = sequelize;
