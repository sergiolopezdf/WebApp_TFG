import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {main, news, publishNews} from "../controllers/render";
import {loginRequired} from "./../controllers/session";

let router = express.Router();

router.use(loginRequired);

/* GET */
router.get('/', main);

router.get('/news', news);

router.get('/publish_new', publishNews);

module.exports = router;
