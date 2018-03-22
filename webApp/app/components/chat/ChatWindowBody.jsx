import React from 'react';
import ChatMessage from "./ChatMessage";

export default class ChatWindowBody extends React.Component {
    render() {

        if (!this.props.messages) {
            return <div id="chatBody"/>;
        }

        return (

            <div id="chatBody">
                {
                    this.props.messages.map((element, index) => {
                        return <ChatMessage author={this.props.author} message={element} key={index}/>;
                    })
                }

            </div>
        );

    }
}
