import React from 'react';
import '../assets/css/style.css';
import {connect} from 'react-redux';
import ChatContactBar from './chat/ChatContactBar';
import ChatMain from './chat/ChatMain';
import {newMessage} from "../../redux/reducers/actions";
import {openConnection, receivedMessage, sendMessage} from "../chatClient";

var selectedChat = "1_2";

class App extends React.Component {

    constructor(props) {
        super(props);

        this._sendMessage = this._sendMessage.bind(this);

        openConnection();

        receivedMessage((msg) => {
            console.log("recibo");
            this.props.dispatch(newMessage(msg));
        });



    }


    _sendMessage(msg) {
        this.props.dispatch(newMessage(msg));

        /* this.props.store.subscribe(() => {
             console.log(this.props.store.getState());
         })*/

        sendMessage(msg);

    }

    render() {





        //console.log(this.props.chat[selectedChat]);


        return (
            <div id="wrapper">

                <ChatMain send={this._sendMessage} messages={this.props.chat[selectedChat]}/>

                <ChatContactBar/>

            </div>

        );
    }

}


function mapStateToProps(state) {
    return {
        chat: state.chat,
        renderModules: state.renderModules
    };
}

export default connect(mapStateToProps)(App);
