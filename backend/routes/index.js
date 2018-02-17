import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import reducers from '../../redux/reducers/reducers';


let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // Create a new Redux store instance
    let store = createStore(reducers)

    // Grab the initial state from our Redux store
    let preloadedState = store.getState()


    res.status(200).render('../views/index.ejs', {
        script: JSON.stringify(preloadedState),
    });
});



module.exports = router;
