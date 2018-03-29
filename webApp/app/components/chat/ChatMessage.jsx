import React from 'react';

export default class ChatMessage extends React.Component {
    render() {

        if (this.props.message.author !== this.props.author) {
            return (
                <div className="receivedMessage message">
                    {this.props.message.message}
                </div>
            );

        }

        //SPAN!!
        return (
            <div className="sentMessage message">
                {this.props.message.message}
            </div>
        );

    }
}
