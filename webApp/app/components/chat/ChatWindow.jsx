import React from 'react';
import ChatWindowHeader from './ChatWindowHeader';
import ChatWindowBody from "./ChatWindowBody";
import ChatWindowMessage from "./ChatWindowMessage";

export default class ChatMain extends React.Component {

    constructor(props) {
        super(props);
        this._sendMessage = this._sendMessage.bind(this);
        this._hideChat = this._hideChat.bind(this);
        this._userTyping = this._userTyping.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    _sendMessage(msg) {
        this.props.send(msg);
    }

    _userTyping(bool, chatId) {
        this.props.userTyping(bool, chatId);
    }

    _hideChat() {
        this.props.hideChat();
    }

    componentDidUpdate() {

    }

    render() {

        return (
            <div id="chatWindow">
                <ChatWindowHeader currentChat={this.props.currentChat}
                                  remoteUsersTyping={this.props.remoteUsersTyping}
                                  hideChat={this._hideChat}
                />
                <ChatWindowBody author={this.props.author} messages={this.props.messages}/>
                <ChatWindowMessage send={this._sendMessage} author={this.props.author}
                                   currentChatId={this.props.currentChat.chatId}
                                   userTyping={this._userTyping}/>
            </div>
        );

    }
}
