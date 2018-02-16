import React from 'react';
import '../assets/css/style.css';
import {connect} from 'react-redux';
import ChatContactBar from './chat/ChatContactBar';
import ChatMain from './chat/ChatMain';


class App extends React.Component {
    render() {
        return (
            <div id="wrapper">

                <ChatMain/>

                <ChatContactBar/>

            </div>

        );
    }

}


function mapStateToProps(state) {
    return {
        initialState: state.initialState,
    };
}

export default connect(mapStateToProps)(App);
