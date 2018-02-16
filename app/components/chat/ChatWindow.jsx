import React from 'react';
import './../assets/css/style.css';
import ChatWindowHeader from './ChatWindowHeader'
import ChatWindowBody from "./ChatWindowBody";
import ChatWindowMessage from "./ChatWindowMessage";

export default class ChatMain extends React.Component {


    constructor(props) {
        super(props);
        this._sendMessage = this._sendMessage.bind(this);
    }


    _sendMessage(msg) {
        this.props.send(msg);
    }


    render() {
        return (
            <div id="chatWindow">
                <ChatWindowHeader/>
                <ChatWindowBody/>
                <ChatWindowMessage send={this._sendMessage}/>
            </div>
        );


    }
}