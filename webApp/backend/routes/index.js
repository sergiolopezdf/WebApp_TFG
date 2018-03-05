import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {main, publishNews} from "../controllers/render";
import {loginRequired} from "./../controllers/session";
import {adminRequired, login} from "../controllers/session";
import {newUser, updatePassword} from "../controllers/management";

let router = express.Router();

//router.use(loginRequired);

/* GET */


router.post('/login', login);

router.get('/publish_new', loginRequired, publishNews);

router.post('/update_password', loginRequired, adminRequired, updatePassword, main);

router.post('/new_user', loginRequired, adminRequired, newUser, main);

router.get('/', loginRequired, main);


module.exports = router;
