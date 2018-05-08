import express from 'express';
import {renderToString} from 'react-dom/server';

import {main, video} from "../controllers/render";
import {loginRequired} from "./../controllers/session";
import {adminRequired, login, logout, tokenCheck, tokenRender} from "../controllers/session";
import {newUser, updatePassword} from "../controllers/management";
import {User} from "../models/models";


let router = express.Router();

router.post('/login', login);

router.post('/update_password', loginRequired, updatePassword, main);

router.post('/new_user', loginRequired, adminRequired, newUser, main);

/* GET */
router.get('/', loginRequired, main);
router.get('/forum', loginRequired, main);
router.get('/publish_new', loginRequired, main);
router.get('/settings', loginRequired, main);
router.get('/users', loginRequired, main);
router.get('/video', loginRequired, main);
router.get('/logout', logout);

module.exports = router;
