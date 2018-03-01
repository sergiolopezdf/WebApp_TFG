import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {main, management, news, publishNews} from "../controllers/render";
import {loginRequired} from "./../controllers/session";
import {adminRequired, login, updatePassword} from "../controllers/session";
import {newUser} from "../controllers/management";

let router = express.Router();

//router.use(loginRequired);

/* GET */
router.get('/', loginRequired, main);

router.post('/login', login);

router.get('/news', loginRequired, news);

router.get('/publish_new', loginRequired, publishNews);

router.get('/management', loginRequired, adminRequired, management);

router.post('/update_password', loginRequired, adminRequired, updatePassword, management);

router.post('/new_user', loginRequired, adminRequired, newUser, management);

//router.get('/savelogin', login, main);

module.exports = router;
