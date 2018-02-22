import React from 'react';
import './../assets/css/style.css';
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
            this._userTyping(false);
            return;
        }


        this._userTyping(true);

    }

    _keyUp(event) {
        this._userTyping(false);
    }

    _userTyping(bool) {
        this.props.userTyping(bool, this.props.chat);
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
            chat: this.props.chat
        }

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
        )

    }
}