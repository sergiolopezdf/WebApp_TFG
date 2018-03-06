import React from 'react';
import '../../assets/css/style.css';

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
        return (
            <div id="contact" onClick={this._openNewChat}>
                <span id="contactName">{this.props.user.username}</span>
                <div id="contactStatus">
                    {this.props.typing && <span className="typing">typing...</span>}

                    {this.props.notifications > 0 && <span>{this.props.chatNotifications}</span>}

                    {this.props.user.online ? <span className="online contactStatus"/> :
                        <span className="offline contactStatus"/>}


                </div>
            </div>
        );
    }
}
