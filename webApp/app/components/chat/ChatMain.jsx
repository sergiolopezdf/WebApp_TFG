import React from 'react';
import ChatWindow from './ChatWindow';

export default class ChatMain extends React.Component {

    constructor(props) {
        super(props);
        this._sendMessage = this._sendMessage.bind(this);
        this._userTyping = this._userTyping.bind(this);
        this._hideChat = this._hideChat.bind(this);
        this._keyDown = this._keyDown.bind(this);
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

    _keyDown(event) {
        if (event.keyCode === 27) {
            this._hideChat();
            return;
        }
    }

    render() {

        return (
            <div id="chatMainWrapper" className="mainWrapper" onKeyDown={this._keyDown}>

                <ChatWindow author={this.props.author} send={this._sendMessage} currentChat={this.props.currentChat}
                            messages={this.props.messages} userTyping={this._userTyping}
                            remoteUsersTyping={this.props.remoteUsersTyping}
                            hideChat={this._hideChat}
                />
            </div>
        );

    }
}
