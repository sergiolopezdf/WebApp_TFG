import React from 'react';
import '../../assets/css/style.css';
import ChatContact from './ChatContact';

export default class ChatContactBar extends React.Component {
    render() {
        return (
            <div id="chatSideWrapper">
                <ChatContact/>
                <ChatContact/>
                <ChatContact/>
                <ChatContact/>

            </div>
        )
    }
}