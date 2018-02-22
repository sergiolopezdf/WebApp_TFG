import React from 'react';
import '../../assets/css/style.css';
import ChatContact from './ChatContact';

export default class ChatContactBar extends React.Component {

    constructor(props) {
        super(props);

        this._openNewChat = this._openNewChat.bind(this);

    }

    _openNewChat(userId) {
        this.props.openNewChat(userId);
    }

    _getChat(userId) {
        let n1 = Math.min(parseInt(this.props.userId), parseInt(userId));
        let n2 = Math.max(parseInt(this.props.userId), parseInt(userId));

        return n1 + "_" + n2;
    }

    render() {

        return (
            <div id="chatSideWrapper">
                {
                    this.props.onlineUsers.map((user, index) => {

                        if (user === this.props.userId) { // User=userId fornow
                            return;
                        }

                        if (this.props.remoteUsersTyping[this._getChat(user)] !== undefined) {
                            return <ChatContact user={user}
                                                typing={this.props.remoteUsersTyping[this._getChat(user)].typing}
                                                key={index} openNewChat={this._openNewChat}/>;
                        }

                        return <ChatContact user={user} key={index} openNewChat={this._openNewChat}/>;

                    })
                }

            </div>
        );

    }
}
