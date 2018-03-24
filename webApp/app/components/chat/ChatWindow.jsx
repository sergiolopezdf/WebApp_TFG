import React from 'react';
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

    _userTyping(bool, chatId) {
        this.props.userTyping(bool, chatId);
    }

    render() {

        return (
            <div id="chatWindow">
                <ChatWindowHeader currentChat={this.props.currentChat}
                                  remoteUsersTyping={this.props.remoteUsersTyping}/>
                <ChatWindowBody author={this.props.author} messages={this.props.messages}/>
                <ChatWindowMessage send={this._sendMessage} author={this.props.author}
                                   currentChatId={this.props.currentChat.chatId}
                                   userTyping={this._userTyping}/>
            </div>
        );


    }
}
