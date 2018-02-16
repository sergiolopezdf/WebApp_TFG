import React from 'react';
import './../assets/css/style.css';

export default class ChatMessage extends React.Component {
    render() {
        return (
            <div id="messageWrapper">
                <text className="message">I'm a message</text>
            </div>
        )

    }
}