import React from 'react';

export default class ChatMyself extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="myselfContact">

                <span id="contactName">{this.props.myself.username}</span>
                <div id="contactStatus">
                    <a href="/logout" id={"logout"}><i className="material-icons">power_settings_new</i></a>
                </div>
            </div>
        );
    }
}
