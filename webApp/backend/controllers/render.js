import {createStore} from 'redux';
import reducers from '../../redux/reducers/reducers';
import {User} from './../models/models';
import {urls} from "../server";
import {ports} from "../server";

export async function main(req, res, next) {

    let users = await User.findAll({
        attributes: ['id', 'username', 'admin', 'name', 'createdAt', 'online'],
    });

    let initialState = {
        remoteUsers: users,
        videoServer: {
            url: urls.videoServerURL,
            port: ports.videoServerPort,
        },

        forumServer: {
            url: urls.forumServerURL,
            port: ports.forumServerPort,
        },
        chatServer: {
            url: urls.chatServerURL,
            port: ports.chatServerPort,
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


