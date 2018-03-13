import {Router} from 'express';

export let router = Router();

router.get('/', () => {
    console.log("Holiwi");
});
