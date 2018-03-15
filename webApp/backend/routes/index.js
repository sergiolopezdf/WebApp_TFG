import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {main} from "../controllers/render";
import {loginRequired} from "./../controllers/session";
import {adminRequired, login, logout} from "../controllers/session";
import {newUser, updatePassword} from "../controllers/management";

export let router = express.Router();

router.post('/login', login);

router.post('/update_password', loginRequired, updatePassword, main);

router.post('/new_user', loginRequired, adminRequired, newUser, main);

/* GET */
router.get('/', loginRequired, main);
router.get('/news', loginRequired, main);
router.get('/publish_new', loginRequired, main);
router.get('/management', loginRequired, main);
router.get('/users', loginRequired, main);
router.get('/video', loginRequired, main);
router.get('/logout', logout);


