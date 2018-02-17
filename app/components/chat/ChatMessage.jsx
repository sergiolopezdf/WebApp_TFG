import React from 'react';
import './../assets/css/style.css';

var author = "1";


export default class ChatMessage extends React.Component {
    render() {

        if (this.props.message.author !== author) {
            return (
                <div id="receivedMessageWrapper">
                    <span className="receivedMessage">{this.props.message.message}</span>
                </div>
            )

        } else {
            return (
                <div id="sentMessageWrapper">
                    <span className="sentMessage">{this.props.message.message}</span>
                </div>
            )

        }


    }
}