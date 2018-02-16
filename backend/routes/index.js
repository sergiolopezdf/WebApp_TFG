import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../app/reducers/reducers';
import App from '../../app/components/App';
import io from 'socket.io-client';


let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // Create a new Redux store instance
    let store = createStore(reducers)

    // Render the component to a string
    let html = renderToString(
        <Provider store={store}>
          <App />
        </Provider>
    )

    // Grab the initial state from our Redux store
    let preloadedState = store.getState()

    //Chat client config
    var socket = io('http://localhost:4000/chat');
    var id = 1;

    console.log("new room");
    socket.emit('room', id);

    store.subscribe(function () {
        let state = store.getState();
        console.log(state);

        //socket.emit('message', msg);
    });


    res.status(200).render('../views/index.ejs', {
        script: JSON.stringify(preloadedState),
    });
});



module.exports = router;
