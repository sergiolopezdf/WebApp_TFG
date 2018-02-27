import {User} from './../models/models';
import {digestPassword} from "../crypto";

export async function loginRequired(req, res, next) {

    if (req.session) {
        next();
        return;
    }

    //Render login page

}

export async function saveLogin(req, res, next) {
    // Render login page
    let username = "sl";
    let password = "sl";

    password = digestPassword(password);

    let user = await _authenticateUser(username, password)

    if (user) {
        req.session = {
            user: user,
        }
        next();
        return;
    }

}

async function _authenticateUser(username, password) {
    let user = await User.findOne({where: {username: username}})

    let loginOk = _isPasswordCorrect(password, user.password);

    if (loginOk) {
        return {
            id: user.id,
            username: user.username,
        }
    }
    return null;
}

function _isPasswordCorrect(inputPassword, dbPassword) {

    return inputPassword === dbPassword;

}

