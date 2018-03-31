import React from 'react';
import '../assets/scss/style.sass';
import {connect} from 'react-redux';
import ChatContactBar from './chat/ChatContactBar';
import ChatMain from './chat/ChatMain';
import Forum from "./forum/Forum";
import ForumBar from "./forum/ForumBar";
import PublishPost from "./forum/PublishPost";
import Settings from "./settings/Settings";
import Alerts from "./Alerts";
import Index from "./Index";
import {
    cleanNotifications,
    deleteAlerts, newAlert,
    newMessage, newNotification,
    setChatHistory,
    setCurrentChat, setInitialNotifications,
    setNews, setNewUserOffline, setNewUserOnline,
    setRemoteUsers,
    setRemoteUsersTyping,
    showChat,
    userTyping,
    setCurrentVideo, setAvailableVideos,
} from "../../redux/reducers/actions";

let querystring = require('querystring');

import {Route, Redirect, Switch, BrowserRouter as Router} from 'react-router-dom';

import {
    openChat,
    openConnection,
    receivedMessage,
    remoteUserIsTyping,
    sendMessage,
    userIsTyping,
    newUserOnline,
    newUserOffline, receivedNotification, removeNotifications, getInitialNotifications,
} from "../chatClient";
import Header from "./Header";
import Video from "./video/Video";

class App extends React.Component {

    constructor(props) {
        super(props);

        //console.log(this.props.store.getState());

        this._sendMessage = this._sendMessage.bind(this);
        this._openNewChat = this._openNewChat.bind(this);
        this._userTyping = this._userTyping.bind(this);
        this._hideChat = this._hideChat.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this._removeAlerts = this._removeAlerts.bind(this);
        this._newAlert = this._newAlert.bind(this);
        this._submitNew = this._submitNew.bind(this);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
        this._setNews = this._setNews.bind(this);
        this._setAvailableVideos = this._setAvailableVideos.bind(this);

        openConnection(this.props.myself.id);

        receivedMessage((msg) => {
            this.props.dispatch(newMessage(msg));
        });

        receivedNotification((chatId) => {
            this.props.dispatch(newNotification(chatId));
        });

        remoteUserIsTyping(details => {
            this.props.dispatch(setRemoteUsersTyping(details));
        });

        newUserOnline(userId => {
            this.props.dispatch(setNewUserOnline(userId));
        });

        newUserOffline(userId => {
            this.props.dispatch(setNewUserOffline(userId));
        });

        getInitialNotifications(notifications => {
            notifications.map((element, index) => {
                this.props.dispatch(setInitialNotifications(element.chat, element.nMessages));
            });
        });

    }

    async componentDidMount() {

        if (this.props.alertMessages) {
            if (await this._alertTimer()) {
                this.props.dispatch(deleteAlerts());
            }
        }
    }

    async componentDidUpdate() {
        if (this.props.alertMessages) {
            if (await this._alertTimer()) {
                this.props.dispatch(deleteAlerts());
            }
        }

    }

    _alertTimer() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 3000);
        });
    }

    _setNews(news) {

        this.props.dispatch(setNews(news.reverse()));

    }

    async _setCurrentVideo(video) {

        let params = {
            id: video.id,
            access_token: this.props.myself.token,
        };

        let id = querystring.stringify(params);

        let getPort = await fetch('http://localhost:8000/play?' + id);

        video.port = (await getPort.json()).port;

        this.props.dispatch(setCurrentVideo(video));
    }

    _openNewChat(user) {

        let n1 = Math.min(parseInt(this.props.myself.id), parseInt(user.id));
        let n2 = Math.max(parseInt(this.props.myself.id), parseInt(user.id));

        let room = n1 + "_" + n2;

        if (!this.props.chat[room]) {
            openChat(room, fullHistory => {
                this.props.dispatch(setChatHistory(fullHistory, room));
            });
        }

        this.props.dispatch(setCurrentChat(room, user.username));
        this.props.dispatch(showChat(true));

        this.props.dispatch(cleanNotifications(room));
        removeNotifications(room);

    }

    _sendMessage(msg) {
        this.props.dispatch(newMessage(msg));
        sendMessage(msg);
    }

    _userTyping(bool, chatId) {
        this.props.dispatch(userTyping(bool, chatId));

        userIsTyping(bool, chatId, this.props.myself.id);
    }

    _hideChat() {
        this.props.dispatch(showChat(false));
    }

    _removeAlerts() {
        this.props.dispatch(deleteAlerts());
        //console.log(this.props.store.getState());
    }

    _newAlert(msg) {
        this.props.dispatch(newAlert(msg));
    }

    _setAvailableVideos(videos) {
        this.props.dispatch(setAvailableVideos(videos));
    }

    async _submitNew(data) {

        let params = {
            access_token: this.props.myself.token,
        };

        let token = querystring.stringify(params);

        let post = await fetch('http://localhost:5000/api/publishpost?' + token, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (post.ok) {
            this._newAlert("Your new has been saved");

            //Tweaakkkk!
            <Redirect to={{
                pathname: '/forum',
            }}/>;
        }

    }

    render() {

        return (

            <Router>

                <div id="wrapper">

                    <Header myself={this.props.myself}/>

                    <div id="contentWrapper">

                        {this.props.modules.chat &&
                        <ChatMain send={this._sendMessage} author={this.props.myself.id}
                                  currentChat={this.props.currentChat}
                                  messages={this.props.chat[this.props.currentChat.chatId]}
                                  userTyping={this._userTyping}
                                  remoteUsersTyping={this.props.remoteUsersTyping[this.props.currentChat]}
                                  hideChat={this._hideChat}/>}


                        <Switch>

                            <Route exact={true} path={'/'} render={() => {
                                return (
                                    <div className="mainWrapper">
                                        {this.props.alertMessages &&
                                        <Alerts alertMessages={this.props.alertMessages}/>}
                                        <Index/>
                                    </div>
                                );
                            }}/>


                            <Route exact={true} path={'/forum'} render={() => {

                                return (
                                    <div className="mainWrapper">
                                        {this.props.alertMessages &&
                                        <Alerts alertMessages={this.props.alertMessages}/>}
                                        <ForumBar/>
                                        <Forum setNews={this._setNews}
                                              news={this.props.news} myself={this.props.myself}/>
                                    </div>
                                );
                            }}/>


                            <Route exact={true} path={'/video'} render={() => {
                                return (
                                    <div className="mainWrapper">
                                        {this.props.alertMessages &&
                                        <Alerts alertMessages={this.props.alertMessages}/>}
                                        <Video availableVideos={this.props.availableVideos}
                                               setCurrentVideo={this._setCurrentVideo}
                                               setAvailableVideos={this._setAvailableVideos}
                                               user={this.props.myself}
                                               currentVideo={this.props.currentVideo}
                                               uploadVideo={this._uploadVideo}
                                        />
                                    </div>
                                );
                            }}/>


                            <Route exact={true} path={'/new_user'} render={() => {
                                return (
                                    <div className="mainWrapper">
                                        {this.props.alertMessages &&
                                        <Alerts alertMessages={this.props.alertMessages}/>}
                                        <Settings myself={this.props.myself} remoteUsers={this.props.remoteUsers}/>
                                    </div>
                                );
                            }}/>

                            <Route exact={true} path={'/settings'} render={() => {
                                return (
                                    <div className="mainWrapper">
                                        {this.props.alertMessages &&
                                        <Alerts alertMessages={this.props.alertMessages}/>}
                                        <Settings myself={this.props.myself} remoteUsers={this.props.remoteUsers}/>
                                    </div>
                                );
                            }}/>

                            <Route exact={true} path={'/update_password'} render={() => {
                                return (
                                    <div className="mainWrapper">
                                        {this.props.alertMessages &&
                                        <Alerts alertMessages={this.props.alertMessages}/>}
                                        <Settings myself={this.props.myself} remoteUsers={this.props.remoteUsers}/>
                                    </div>
                                );
                            }}/>

                            <Route exact={true} path={'/publish_new'} render={() => {
                                return (
                                    <div className="mainWrapper">
                                        {this.props.alertMessages &&
                                        <Alerts alertMessages={this.props.alertMessages}/>}
                                        <PublishPost submitNew={this._submitNew} userId={this.props.myself.id}/>
                                    </div>
                                );
                            }}/>

                        </Switch>

                        <ChatContactBar myself={this.props.myself} remoteUsers={this.props.remoteUsers}
                                        openNewChat={this._openNewChat}
                                        chatNotifications={this.props.chatNotifications}
                                        remoteUsersTyping={this.props.remoteUsersTyping}/>
                    </div>

                </div>
            </Router>
        );

    }

}

function mapStateToProps(state) {
    return {
        chat: state.chat,
        chatNotifications: state.chatNotifications,
        modules: state.modules,
        myself: state.myself,
        currentChat: state.currentChat,
        remoteUsers: state.remoteUsers,
        userTyping: state.userTyping,
        remoteUsersTyping: state.remoteUsersTyping,
        news: state.news,
        alertMessages: state.alertMessages,
        availableVideos: state.availableVideos,
        currentVideo: state.currentVideo,
    };
}

export default connect(mapStateToProps)(App);
