import React from 'react';
import './../assets/css/style.css';
import ChatWindowHeader from './ChatWindowHeader'
import ChatWindowBody from "./ChatWindowBody";
import ChatWindowMessage from "./ChatWindowMessage";

export default class ChatMain extends React.Component {


    constructor(props) {
        super(props);
        this._sendMessage = this._sendMessage.bind(this);
        this._userTyping = this._userTyping.bind(this);
    }


    _sendMessage(msg) {
        this.props.send(msg);
    }

    _userTyping(bool, chat) {
        this.props.userTyping(bool, chat);
    }

    render() {


        //CAMBIAR HEADER!! AUTHOR ESTÁ MAL. REMOTE USERS TYPING SOLO PASAR EL QUE ESTÁ HABLANDO
        return (
            <div id="chatWindow">
                <ChatWindowHeader author={this.props.author} remoteUsersTyping={this.props.remoteUsersTyping}/>
                <ChatWindowBody author={this.props.author} messages={this.props.messages}/>
                <ChatWindowMessage send={this._sendMessage} author={this.props.author} chat={this.props.chat}
                                   userTyping={this._userTyping}/>
            </div>
        );


    }
}