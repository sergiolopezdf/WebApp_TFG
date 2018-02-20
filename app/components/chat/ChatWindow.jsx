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


        //console.log(this.props.messages);
        return (
            <div id="chatWindow">
                <ChatWindowHeader/>
                <ChatWindowBody messages={this.props.messages}/>
                <ChatWindowMessage send={this._sendMessage} author={this.props.author} chat={this.props.chat}/>
            </div>
        );


    }
}