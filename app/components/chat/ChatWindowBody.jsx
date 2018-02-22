import React from 'react';
import './../assets/css/style.css';
import ChatMessage from "./ChatMessage";

let msgs = [];

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
