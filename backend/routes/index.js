import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {main, news, publishNews} from "../controllers/render";
import {loginRequired} from "./../controllers/session";
import {login} from "../controllers/session";

let router = express.Router();

//router.use(loginRequired);

/* GET */
router.get('/', loginRequired, main);

router.post('/login', login);

router.get('/news', loginRequired, news);

router.get('/publish_new', loginRequired, publishNews);

//router.get('/savelogin', login, main);

module.exports = router;
