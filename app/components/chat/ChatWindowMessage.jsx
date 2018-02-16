import React from 'react';
import './../assets/css/style.css';
import $ from 'jquery';

export default class ChatWindowMessage extends React.Component {


    constructor(props) {
        super(props);
        this._sendMessage = this._sendMessage.bind(this);
    }

    _sendMessage() {
        let msg = $('#msg').val();

        $('#msg').val("");

        this.props.send(msg);
    }

    render() {
        return (
            <div id="chatWindowMessageBox">
                <input id="msg"/>
                <button action="submit" className="button" onClick={this._sendMessage}>
                    Send
                </button>


            </div>
        )

    }
}