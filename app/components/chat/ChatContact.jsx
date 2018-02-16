import React from 'react';
import '../../assets/css/style.css';

export default class ChatContactBar extends React.Component {
    render() {
        return (
            <div id="contact">
                <text id="contactName">Millie Bobbie Brown</text>
                <div id="contactStatus"><span className="online contactStatus"></span></div>
            </div>
        )
    }
}