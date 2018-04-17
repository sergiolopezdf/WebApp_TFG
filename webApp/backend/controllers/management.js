import {User} from './../models/models';
import {generateToken} from "../crypto";

export async function newUser(req, res, next) {

    let user = await User.findOne({where: {username: req.body.username}});

    if (user) {
        req.session.alert = user.username + " is already registered. Please choose another username";
        next();
        return;
    }

    let token = generateToken(req.sanitize(req.body.name), req.sanitize(req.body.password));


    let newUser = User.build({
        name: req.sanitize(req.body.name),
        username: req.sanitize(req.body.username),
        password: req.sanitize(req.body.password),
        admin: req.sanitize(req.body.admin === "on" ? true : false),
        token: token,
        online: false,
    });

    let userOk = await newUser.save();

    if (userOk) {
        req.session.alert = userOk.username + " has been registered";
        next();
    }

}

export async function updatePassword(req, res, next) {

    let user = await User.findOne({where: {username: req.session.user.username}});

    user.password = req.sanitize(req.body.updatePassword);

    user.token = generateToken(user.name, req.sanitize(req.body.updatePassword));

    if (await user.save()) {
        req.session.alert = "Password updated";
    }

    req.session.user = user;

    next();

}
