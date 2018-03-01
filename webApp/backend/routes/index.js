import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {main, management, news, publishNews, users} from "../controllers/render";
import {loginRequired} from "./../controllers/session";
import {adminRequired, login} from "../controllers/session";
import {newUser, updatePassword} from "../controllers/management";

let router = express.Router();

//router.use(loginRequired);

/* GET */
router.get('/', loginRequired, main);

router.post('/login', login);

router.get('/news', loginRequired, news);

router.get('/publish_new', loginRequired, publishNews);

router.get('/management', loginRequired, management);

router.get('/users', loginRequired, adminRequired, users);

router.post('/update_password', loginRequired, adminRequired, updatePassword, management);

router.post('/new_user', loginRequired, adminRequired, newUser, users);

//router.get('/savelogin', login, main);

module.exports = router;
