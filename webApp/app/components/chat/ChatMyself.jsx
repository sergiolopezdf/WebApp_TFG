import React from 'react';
import '../../assets/css/style.css';

export default class ChatMyself extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="myselfContact">

                <span id="contactName">{this.props.myself.username}</span>
                <div id="contactStatus">
                    <a href="/logout" id={"logout"}><i class="material-icons">power_settings_new</i></a>
                </div>
            </div>
        );
    }
}
