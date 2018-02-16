import React from 'react';
import './../assets/css/style.css';
import {Button} from 'react-bootstrap';

export default class ChatWindowMessage extends React.Component {

    sendMessage() {
        return true;
    }

    render() {
        return (
            <div id="chatWindowMessageBox">
                <div role="input" contentEditable="true" id="input">asdasd</div>
                <button action="submit" className="button" onClick={this.sendMessage}>
                    Send
                </button>


            </div>
        )

    }
}