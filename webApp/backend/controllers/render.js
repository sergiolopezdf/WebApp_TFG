import {createStore} from 'redux';
import reducers from '../../redux/reducers/reducers';
import {User} from './../models/models';

export async function main(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });

    let initialState = {
        modules: {
            main: true,
        },
        remoteUsers: users,
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

/*
export async function news(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });

    let initialState = {
        myself: req.session.user,
        alertMessages: req.session.alert,
        remoteUsers: users,
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
*/

/*export async function management(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });

    let initialState = {
        myself: req.session.user,
        alertMessages: req.session.alert,
        remoteUsers: users,
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

}*/

/*export async function users(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });
    let initialState = {
        myself: req.session.user,
        remoteUsers: users,
        alertMessages: req.session.alert,
        modules: {
            users: true,
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

}*/

/*
export async function publishNews(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });

    let initialState = {
        myself: req.session.user,
        alertMessages: req.session.alert,
        remoteUsers: users,
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
*/
