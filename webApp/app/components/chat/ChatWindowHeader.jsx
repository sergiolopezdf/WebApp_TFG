import React from 'react';

export default class ChatWindowHeader extends React.Component {

    render() {

        return (
            <div id="chatHeader">
              <span className="chatHeaderTitle">
                Chat with:
                <span className="chatHeaderName"> {this.props.currentChat.username} </span>

            </span>
                {this.props.remoteUsersTyping !== undefined &&
                <span className="typing">
                        {this.props.remoteUsersTyping.typing && "         (typing...)"}
                    </span>
                }
            </div>

        );

    }
}
