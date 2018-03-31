import React from 'react';

export default class ChatWindowHeader extends React.Component {

    constructor(props) {
        super(props);
        this._hideChat = this._hideChat.bind(this);
    }

    _hideChat() {
        this.props.hideChat();
    }


    render() {

        return (
            <div id="chatHeader">
                <div className="chatHeaderTitle">
                    Chat with:
                </div>
                <div className="chatHeaderName"> {" " + this.props.currentChat.username} </div>


                {this.props.remoteUsersTyping !== undefined &&
                <div className="typing">
                    {this.props.remoteUsersTyping.typing && "         (typing...)"}
                </div>
                }

                <i className="material-icons" onClick={this._hideChat}>clear</i>
            </div>

        );

    }
}
