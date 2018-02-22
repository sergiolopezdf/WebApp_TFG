import React from 'react';
import '../assets/css/style.css';
import {connect} from 'react-redux';
import ChatContactBar from './chat/ChatContactBar';
import ChatMain from './chat/ChatMain';
import Main from './Main';
import {
    addNewOnlineUser,
    newMessage,
    setChatHistory,
    setCurrentChat,
    setOnlineUsers,
    setRemoteUsersTyping,
    setUserId,
    userTyping
} from "../../redux/reducers/actions";


import {
    chatRequest,
    getUsersOnline,
    openChat,
    openConnection,
    receivedMessage,
    remoteUserIsTyping,
    sendMessage,
    userIsTyping
} from "../chatClient";

class App extends React.Component {

    constructor(props) {
        super(props);

        this._sendMessage = this._sendMessage.bind(this);
        this._openNewChat = this._openNewChat.bind(this);
        this._userTyping = this._userTyping.bind(this);

        let userId = prompt("Set user ID");

        this.props.dispatch(setUserId(userId));

        openConnection(userId);

        getUsersOnline((users) => {
            this.props.dispatch(setOnlineUsers(users));

        });

        receivedMessage((msg) => {
            this.props.dispatch(newMessage(msg));


        });

        remoteUserIsTyping(details => {

            //console.log(details);
            this.props.dispatch(setRemoteUsersTyping(details));

            //console.log(this.props.store.getState());

        });


    }


    _openNewChat(userId) {

        let n1 = Math.min(parseInt(this.props.userId), parseInt(userId));
        let n2 = Math.max(parseInt(this.props.userId), parseInt(userId));


        let room = n1 + "_" + n2;

        openChat(room, fullHistory => {
            this.props.dispatch(setChatHistory(fullHistory));
            //console.log(this.props.store.getState());
        });

        this.props.dispatch(setCurrentChat(room));

        //console.log(this.props.store.getState());

    }

    _sendMessage(msg) {
        this.props.dispatch(newMessage(msg));
        sendMessage(msg);
    }

    _userTyping(bool, chat) {
        this.props.dispatch(userTyping(bool, chat));

        userIsTyping(bool, chat, this.props.userId);
    }

    render() {

        //console.log((this.props.onlineUsers));

        if (this.props.currentChat) {
            return (
                <div id="wrapper">

                    <ChatMain send={this._sendMessage} author={this.props.userId} chat={this.props.currentChat}
                              messages={this.props.chat[this.props.currentChat]} userTyping={this._userTyping}
                              remoteUsersTyping={this.props.remoteUsersTyping}/>

                    <ChatContactBar userId={this.props.userId} onlineUsers={this.props.onlineUsers}
                                    openNewChat={this._openNewChat}/>

                </div>

            );
        }


        return (
            <div id="wrapper">

                <Main/>
                <ChatContactBar userId={this.props.userId} onlineUsers={this.props.onlineUsers}
                                openNewChat={this._openNewChat}/>

            </div>
        )


    }

}


function mapStateToProps(state) {
    return {
        chat: state.chat,
        modules: state.renderModules,
        userId: state.userId,
        currentChat: state.currentChat,
        onlineUsers: state.onlineUsers,
        userTyping: state.userTyping,
        remoteUsersTyping: state.remoteUsersTyping
    };
}

export default connect(mapStateToProps)(App);
