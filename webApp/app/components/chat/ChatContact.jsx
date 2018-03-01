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

    render() {
        return (
            <div id="contact" onClick={this._openNewChat}>
                <span id="contactName">{this.props.user.username}</span>
                <div id="contactStatus">
                    {this.props.typing ? <span className="typing">(typing...)</span> :
                        <span className="online contactStatus"/>
                    }
                </div>
            </div>
        );
    }
}
