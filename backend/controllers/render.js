import {createStore} from 'redux';
import reducers from '../../redux/reducers/reducers';

export function main(req, res, next) {

    let initialState = {
        modules: {
            main: true,
        },
    };

    if (req.session) {
        initialState.myself = req.session.user;
        initialState.alertMessages = req.session.alert;
        req.session.alert = null;
    }

    // Create a new Redux store instance. No initial state, default
    let store = createStore(reducers, initialState);

    // Grab the initial state from our Redux store
    let preloadedState = store.getState();

    res.status(200).render('../views/index.ejs', {
        script: JSON.stringify(preloadedState),
    });
}

export function news(req, res, next) {
    let initialState = {
        myself: req.session.user,
        alertMessages: req.session.alert,
        modules: {
            news: true,
        },
    };

    req.session.alert = null;

    // Create a new Redux store instance
    let store = createStore(reducers, initialState);

    // Grab the initial state from our Redux store
    let preloadedState = store.getState();

    res.status(200).render('../views/index.ejs', {
        script: JSON.stringify(preloadedState),
    });

}

export function management(req, res, next) {
    let initialState = {
        myself: req.session.user,
        alertMessages: req.session.alert,
        modules: {
            management: true,
        },
    };

    req.session.alert = null;

    // Create a new Redux store instance
    let store = createStore(reducers, initialState);

    // Grab the initial state from our Redux store
    let preloadedState = store.getState();

    res.status(200).render('../views/index.ejs', {
        script: JSON.stringify(preloadedState),
    });

}

export function publishNews(req, res, next) {
    let initialState = {
        myself: req.session.user,
        alertMessages: req.session.alert,
        modules: {
            publishNew: true,
        },
    };

    req.session.alert = null;

    // Create a new Redux store instance
    let store = createStore(reducers, initialState);

    // Grab the initial state from our Redux store
    let preloadedState = store.getState();

    res.status(200).render('../views/index.ejs', {
        script: JSON.stringify(preloadedState),
    });

}
