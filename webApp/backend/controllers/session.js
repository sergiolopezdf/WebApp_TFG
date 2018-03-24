import {User} from './../models/models';
import {digestPassword} from "../crypto";

export async function loginRequired(req, res, next) {

    // console.log(req.session.user);

    if (req.session.user) {
        next();
        return;
    }

    res.render('../views/login.ejs', {
        msg: false,
    });

}

export async function adminRequired(req, res, next) {
    if (req.session.user.admin) {
        next();
        return;
    }

    res.send(403);

}

export async function login(req, res, next) {

    // Render login page
    let username = req.body.username;
    let password = req.body.password;

    password = digestPassword(password);

    let user = await _authenticateUser(username, password);

    if (user) {
        req.session.user = user;
        res.redirect('/');
        return;
    }

    res.render('../views/login.ejs', {
        msg: "Incorrect username or password",
    });
}

export function tokenCheck(req, res, next) {

    passport.authenticate('bearer', {session: false});

}

export function tokenRender(req, res, next) {
    console.log("holi2");
    res.json({username: req.user.username});
}

export async function logout(req, res, next) {

    if (req.session.user) {
        req.session.destroy();

    }

    res.render('../views/login.ejs', {
        msg: false,
    });

}

async function _authenticateUser(username, password) {
    let user = await User.findOne({where: {username: username}});

    if (!user) {
        return null;
    }

    let loginOk = _isPasswordCorrect(password, user.password);

    if (loginOk) {
        return {
            id: user.id,
            username: user.username,
            name: user.name,
            online: true,
            createdAt: user.createdAt,
            admin: user.admin,
        };
    }
    return null;
}

function _isPasswordCorrect(inputPassword, dbPassword) {

    return inputPassword === dbPassword;

}

