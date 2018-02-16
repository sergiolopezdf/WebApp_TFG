import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {hydrate} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers/reducers'

import App from './components/App';


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(reducers, preloadedState)

hydrate(
    <AppContainer>
        <Provider store={store}>
            <App store={store}/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const newApp = require('./components/App').default;
        render(newApp);
    });
}

