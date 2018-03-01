import {User} from './../models/models';
import {digestPassword} from "../crypto";

export async function loginRequired(req, res, next) {

    console.log(req.session.user);

    if (req.session.user) {
        next();
        return;
    }

    res.render('../views/login.ejs');

}

export async function login(req, res, next) {

    // Render login page
    let username = req.body.username;
    let password = req.body.password;


    password = digestPassword(password);

    let user = await _authenticateUser(username, password);


    if (user) {
        req.session.user = user;
        console.log(req.session);
        res.redirect('/');
    }
}

async function _authenticateUser(username, password) {
    let user = await User.findOne({where: {username: username}});

    //console.log(user);

    let loginOk = _isPasswordCorrect(password, user.password);

    if (loginOk) {
        return {
            id: user.id,
            username: user.username,
        };
    }
    return null;
}

function _isPasswordCorrect(inputPassword, dbPassword) {

    return inputPassword === dbPassword;

}

