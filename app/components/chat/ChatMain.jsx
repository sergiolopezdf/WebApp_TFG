import React from 'react';
import './../assets/css/style.css';
import ChatWindow from './ChatWindow';

export default class ChatMain extends React.Component {
    render() {
        return (
            <div id="chatMainWrapper">
                <ChatWindow/>
            </div>
        )


    }
}