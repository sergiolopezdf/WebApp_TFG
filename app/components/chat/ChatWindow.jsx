import React from 'react';
import './../assets/css/style.css';
import ChatWindowHeader from './ChatWindowHeader'
import ChatWindowBody from "./ChatWindowBody";
import ChatWindowMessage from "./ChatWindowMessage";

export default class ChatMain extends React.Component {
    render() {
        return (
            <div id="chatWindow">
                <ChatWindowHeader/>
                <ChatWindowBody/>
                <ChatWindowMessage/>
            </div>
        );


    }
}