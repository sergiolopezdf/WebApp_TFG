import React from 'react';
import '../../assets/css/style.css';
import ChatContact from './ChatContact';
import ChatMyself from "./ChatMyself";

export default class ChatContactBar extends React.Component {

    constructor(props) {
        super(props);

        this._openNewChat = this._openNewChat.bind(this);

    }

    _openNewChat(user) {
        this.props.openNewChat(user);
    }

    _getChat(userId) {

        let n1 = Math.min(parseInt(this.props.myself.id), parseInt(userId));
        let n2 = Math.max(parseInt(this.props.myself.id), parseInt(userId));

        return "" + n1 + "_" + n2;
    }

    render() {

        return (
            <div id="chatSideWrapper">

                <ChatMyself myself={this.props.myself}/>
                {
                    this.props.remoteUsers.map((user, index) => {

                        if (user.id === this.props.myself.id) {
                            return;
                        }

                        if (this.props.remoteUsersTyping[this._getChat(user.id)] !== undefined) {
                            return <ChatContact user={user}
                                                typing={this.props.remoteUsersTyping[this._getChat(user.id)].typing}
                                                key={index} openNewChat={this._openNewChat}/>;
                        }

                        return <ChatContact user={user}
                                            notifications={this.props.chatNotifications[this._getChat(user.id)]}
                                            key={index} openNewChat={this._openNewChat}/>;

                    })
                }

            </div>
        );

    }
}
