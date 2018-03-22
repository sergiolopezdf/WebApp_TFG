import {createStore} from 'redux';
import reducers from '../../redux/reducers/reducers';
import {User, Video} from './../models/models';

export async function main(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });

    let videos = await Video.findAll({
        attributes: ['id', 'name', 'port', 'status', 'createdAt'],
        include: [{
            model: User,
            attributes: ['username'],
            required: true,
        }],
    });


    let initialState = {
        modules: {
            main: true,
        },
        remoteUsers: users,
        availableVideos: videos,
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

export async function video(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });

    let videos = await Video.findAll({
        attributes: ['id', 'name', 'port', 'status', 'createdAt'],
        include: [{
            model: User,
            attributes: ['username'],
            required: true,
        }],
    });

    let initialState = {
        modules: {
            main: true,
        },
        remoteUsers: users,
        availableVideos: videos,
    };

    if (req.session) {
        initialState.myself = req.session.user;
        req.session.alert = null;
    }

    if (req.query.upload === "ok") {

        initialState.alertMessages = "Your video has been uploaded succesfully! It will be available soon.";

    }

    // Create a new Redux store instance. No initial state, default
    let store = createStore(reducers, initialState);

    // Grab the initial state from our Redux store
    let preloadedState = store.getState();

    res.status(200).render('../views/index.ejs', {
        script: JSON.stringify(preloadedState),
    });

}

