import React from 'react';
import './../assets/css/style.css';

export default class ChatMessage extends React.Component {
    render() {

        if (this.props.received) {
            return (
                <div id="receivedMessageWrapper">
                    <text className="receivedMessage">I'm a message</text>
                </div>
            )

        } else {
            return (
                <div id="sentMessageWrapper">
                    <text className="sentMessage">And here's the answer</text>
                </div>
            )

        }


    }
}