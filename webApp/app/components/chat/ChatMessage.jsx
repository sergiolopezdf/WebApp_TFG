import React from 'react';

export default class ChatMessage extends React.Component {
    render() {

        if (this.props.message.author !== this.props.author) {
            return (
                <div id="receivedMessageWrapper">
                    <span className="receivedMessage">{this.props.message.message}</span>
                </div>
            );

        }

        //SPAN!!
        return (
                <div id="sentMessageWrapper">
                    <span className="sentMessage">{this.props.message.message}</span>
                </div>
        );

    }
}
