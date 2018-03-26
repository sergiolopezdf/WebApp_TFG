import {Router} from 'express';

export let router = Router();

import {User, New} from "./models";

router.get('/', (req, res) => {

    res.send("Holiwi");

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
