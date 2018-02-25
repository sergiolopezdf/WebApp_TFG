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
    setNews,
    setOnlineUsers,
    setRemoteUsersTyping,
    setUserId,
    showChat,
    userTyping,
} from "../../redux/reducers/actions";

import {
    chatRequest,
    getUsersOnline,
    openChat,
    openConnection,
    receivedMessage,
    remoteUserIsTyping,
    sendMessage,
    userIsTyping,
} from "../chatClient";
import Header from "./Header";

class App extends React.Component {

    constructor(props) {
        super(props);

        this._sendMessage = this._sendMessage.bind(this);
        this._openNewChat = this._openNewChat.bind(this);
        this._userTyping = this._userTyping.bind(this);
        this._hideChat = this._hideChat.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        let userId = prompt("Set user ID");

        this.props.dispatch(setUserId(userId));

        openConnection(userId);

        getUsersOnline((users) => {
            this.props.dispatch(setOnlineUsers(users));

        });

        receivedMessage((msg) => {
            this.props.dispatch(newMessage(msg));

        });

        //console.log(this.props.store.getState());

        remoteUserIsTyping(details => {

            // console.log(details);
            this.props.dispatch(setRemoteUsersTyping(details));

            // console.log(this.props.store.getState());

        });


    }

    componentDidMount() {
        if (this.props.modules.news) {
            this._getNews()
        }
    }

    _getNews() {


        fetch('http://localhost:5000/api/posts?access_token=bb')
            .then((response) => response.json())

            .then((parsedResponse) => {

                let news = parsedResponse.reverse();

                this.props.dispatch(setNews(news));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    _openNewChat(userId) {

        let n1 = Math.min(parseInt(this.props.userId), parseInt(userId));
        let n2 = Math.max(parseInt(this.props.userId), parseInt(userId));

        let room = n1 + "_" + n2;

        openChat(room, fullHistory => {
            this.props.dispatch(setChatHistory(fullHistory));
        });

        this.props.dispatch(setCurrentChat(room));
        this.props.dispatch(showChat(true));

        // console.log(this.props.store.getState());

    }

    _sendMessage(msg) {
        this.props.dispatch(newMessage(msg));
        sendMessage(msg);
    }

    _userTyping(bool, chat) {
        this.props.dispatch(userTyping(bool, chat));

        userIsTyping(bool, chat, this.props.userId);
    }

    _hideChat() {
        this.props.dispatch(showChat(false));
    }

    render() {

        return (
            <div id="wrapper">

                <Header/>

                <div id="contentWrapper">
                    {this.props.modules.chat &&
                    <ChatMain send={this._sendMessage} author={this.props.userId} currentChat={this.props.currentChat}
                              messages={this.props.chat[this.props.currentChat]} userTyping={this._userTyping}
                              remoteUsersTyping={this.props.remoteUsersTyping[this.props.currentChat]}
                              hideChat={this._hideChat}/>}

                    <Main modules={this.props.modules} getNews={this._getNews} news={this.props.news}/>
                    <ChatContactBar userId={this.props.userId} onlineUsers={this.props.onlineUsers}
                                    openNewChat={this._openNewChat} remoteUsersTyping={this.props.remoteUsersTyping}/>
                </div>


            </div>
        );

    }

}

function mapStateToProps(state) {
    return {
        chat: state.chat,
        modules: state.modules,
        userId: state.userId,
        currentChat: state.currentChat,
        onlineUsers: state.onlineUsers,
        userTyping: state.userTyping,
        remoteUsersTyping: state.remoteUsersTyping,
        news: state.news
    };
}

export default connect(mapStateToProps)(App);
