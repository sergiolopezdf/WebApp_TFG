import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../../app/reducers/reducers';
import App from '../../app/components/App';


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

    res.status(200).render('../views/index.ejs', {
        //html,
        script: JSON.stringify(preloadedState),
    });
});


/*router.get('/app/assets/css/style.css', function (req,res,next) {

    res.sendFile(__dirname + '../../app/assets/css/style.css');

})*/
module.exports = router;
