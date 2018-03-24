import express from 'express';
import {renderToString} from 'react-dom/server';

import {main, video} from "../controllers/render";
import {loginRequired} from "./../controllers/session";
import {adminRequired, login, logout, tokenCheck, tokenRender} from "../controllers/session";
import {newUser, updatePassword} from "../controllers/management";
import {User} from "../models/models";

/* Passport */
let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(
    async function(token, done) {
        let user = await User.findOne({where: {token: token}});

        if (!user) {
            return done(null, false);
        }

        return done(null, user, {scope: 'all'});
    },
));

let router = express.Router();

router.post('/login', login);

router.post('/update_password', loginRequired, updatePassword, main);

router.post('/new_user', loginRequired, adminRequired, newUser, main);

/* GET */
router.get('/', loginRequired, main);
router.get('/news', loginRequired, main);
router.get('/publish_new', loginRequired, main);
router.get('/management', loginRequired, main);
router.get('/users', loginRequired, main);
router.get('/video', loginRequired, video);
router.get('/logout', logout);

/* Token Auth */
router.get('/tokenAuth', passport.authenticate('bearer', {session: false}), function(req, res) {

    res.json({username: req.user.username});

});

module.exports = router;
