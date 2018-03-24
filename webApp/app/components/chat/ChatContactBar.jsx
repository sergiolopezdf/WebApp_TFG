import React from 'react';
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

    _getChatId(userId) {

        let n1 = Math.min(parseInt(this.props.myself.id), parseInt(userId));
        let n2 = Math.max(parseInt(this.props.myself.id), parseInt(userId));

        return n1 + "_" + n2;
    }

    render() {

        return (
            <div id="chatSideWrapper">

                <ChatMyself myself={this.props.myself}/>
                {
                    this.props.remoteUsers.map((user, index) => {

                        let chatId = this._getChatId(user.id);

                        let chatNotifications = this.props.chatNotifications[chatId];

                        //console.log(chatNotifications);

                        if (user.id === this.props.myself.id) {
                            return;
                        }

                        if (this.props.remoteUsersTyping[chatId]) {
                            return <ChatContact user={user}
                                                typing={this.props.remoteUsersTyping[chatId].typing}
                                                key={index} openNewChat={this._openNewChat}
                                                chatNotifications={chatNotifications}/>;
                        }

                        return <ChatContact user={user}
                                            chatNotifications={chatNotifications}
                                            key={index} openNewChat={this._openNewChat}/>;

                    })
                }

            </div>
        );

    }
}
