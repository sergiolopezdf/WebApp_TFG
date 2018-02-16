import React from 'react';
import './../assets/css/style.css';
import ChatMessage from "./ChatMessage";

export default class ChatWindowBody extends React.Component {
    render() {
        return (
            <div id="chatBody">
                <ChatMessage/>
            </div>

        )

    }
}