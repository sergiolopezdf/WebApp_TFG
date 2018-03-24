import React from 'react';
import $ from 'jquery';

export default class ChatWindowMessage extends React.Component {

    constructor(props) {
        super(props);
        this._sendMessage = this._sendMessage.bind(this);
        this._keyDown = this._keyDown.bind(this);
        this._keyUp = this._keyUp.bind(this);
        this._userTyping = this._userTyping.bind(this);

    }

    _keyDown(event) {
        if (event.keyCode === 13) {
            this._sendMessage();
            event.preventDefault(); // Disabling \n
            this._userTyping(false);
            return;
        }

        if (event.keyCode === 18 || event.keyCode === 17 || event.keyCode === 9) { // ALT o CTRL
            this._userTyping(false);
            return;
        }

        if (event.keyCode > 110 && event.keyCode < 125) {
            this._userTyping(false);
            return;
        }

        this._userTyping(true);

    }

    _keyUp() {
        this._userTyping(false);
    }

    _userTyping(bool) {
        this.props.userTyping(bool, this.props.currentChatId);
    }

    _sendMessage() {

        if ($('#msg').val() === "") {
            return;
        }

        let msg = {
            author: this.props.author,
            date: new Date(),
            message: $('#msg').val(),
            thread: "default",
            chatId: this.props.currentChatId,
        };

        $('#msg').val("");

        this.props.send(msg);
    }

    render() {
        return (
            <div id="chatWindowMessageBox">
                <textarea id="msg" onKeyDown={this._keyDown} onKeyUp={this._keyUp}/>
                <button action="submit" className="button" onClick={this._sendMessage}>
                    Send
                </button>

            </div>
        );

    }
}
