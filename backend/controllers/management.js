import {User} from './../models/models';
import {digestPassword} from "../crypto";

export async function newUser(req, res, next) {

    let user = await User.findOne({where: {username: req.body.username}});

    if(user) {
        req.session.alert = user.username + "is already registered. Please choose another username.";
        next();
        return;
    }

    let newUser = User.build({
        username: req.body.username,
        password: req.body.password,
        admin: false
    });


    //PROBLEM HERE!
    let userOk = await User.save();

    if(userOk) {
        req.session.alert = user.username + "has been registered.";
        next();
    }


}
