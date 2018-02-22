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

    render() {

        return (
            <div id="chatSideWrapper">
                {
                    this.props.onlineUsers.map((user, index) => {

                        if (user === this.props.userId) { //User=userId fornow
                            return;
                        }

                        return <ChatContact user={user} key={index} openNewChat={this._openNewChat}/>
                    })
                }


            </div>
        )


    }
}