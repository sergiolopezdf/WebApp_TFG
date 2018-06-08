import React from 'react';
import $ from 'jquery';

export default class ChatContactBar extends React.Component {

    constructor(props) {
        super(props);

        this._openNewChat = this._openNewChat.bind(this);

    }

    _openNewChat() {
        this.props.openNewChat(this.props.user);
    }

    _getChat(userId) {

        let n1 = Math.min(parseInt(this.props.myself.id), parseInt(userId));
        let n2 = Math.max(parseInt(this.props.myself.id), parseInt(userId));

        return "" + n1 + "_" + n2;
    }

    render() {

        if (this.props.chatNotifications > 0) {
            $('#' + this.props.user.id).addClass("chatNotificationStyle");
        } else {

            $('#' + this.props.user.id).removeClass("chatNotificationStyle");
        }


        return (
            <div id={this.props.user.id} className={"contact"} onClick={this._openNewChat}>
                <div id="contactName">{this.props.user.username}</div>

                {this.props.typing ?
                    <div id="contactStatus">
                        <div className="typing">typing...</div>
                    </div>
                    :

                    <div id="contactStatus">

                        {this.props.chatNotifications > 0 ?
                            <div className={"numberOfNotifications"}>{this.props.chatNotifications}</div>
                            :
                            this.props.user.online ? <div className="online contactStatus"/> :
                                <div className="offline contactStatus"/>

                        }


                    </div>

                }


            </div>
        );
    }
}
