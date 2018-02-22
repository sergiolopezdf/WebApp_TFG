import React from 'react';
import './../assets/css/style.css';
import ChatWindow from './ChatWindow';

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

        //console.log(this.props.messages);

        return (
            <div id="chatMainWrapper" className="mainWrapper">
                <ChatWindow author={this.props.author} send={this._sendMessage} chat={this.props.chat}
                            messages={this.props.messages} userTyping={this._userTyping}
                            remoteUsersTyping={this.props.remoteUsersTyping}/>
            </div>
        );

    }
}
