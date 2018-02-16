import React from 'react';
import '../assets/css/style.css';
import {connect} from 'react-redux';
import ChatContactBar from './chat/ChatContactBar';
import ChatMain from './chat/ChatMain';
import {sendMessage} from "../reducers/actions";

import {createStore} from 'redux';
import reducers from '../../app/reducers/reducers';


class App extends React.Component {

    constructor(props) {
        super(props);

        this._sendMessage = this._sendMessage.bind(this);

    }

    _sendMessage(msg) {
        this.props.dispatch(sendMessage(msg));

    }

    render() {

        return (
            <div id="wrapper">

                <ChatMain send={this._sendMessage}/>

                <ChatContactBar/>

            </div>

        );
    }

}


function mapStateToProps(state) {
    return {
        sendMessage: state.sendMessage,
        receivedMessage: state.receivedMessage,
    };
}

export default connect(mapStateToProps)(App);
