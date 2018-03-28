import {Router} from 'express';

export let router = Router();

import {User, New} from "./models";

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

//Authorizing requests
router.use(passport.authenticate('bearer', {session: false}));

//Unauthorize all those routes not starting with /api
router.get(/^(?!\/api\/)/, (req, res) => {

    res.status(403).send();

});

router.get('/api/getposts', async(req, res) => {

    let news = await New.findAll({
        include: [{
            model: User,
            attributes: ['id', 'username'],
            required: true,
        }],
    });

    res.send(news);

});

router.post('/api/publishpost', async(req, res) => {

    let post = req.body;

    let newPost = await New.create({
        authorId: post.authorId,
        title: post.title,
        content: post.content,
    });

    if (newPost) {
        res.status(200).send();
    }

});

