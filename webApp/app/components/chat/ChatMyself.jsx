import React from 'react';

export default class ChatMyself extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="myselfContact">

                <div id="contactName">{this.props.myself.username}</div>
                <div id="contactStatus">
                    <a href="/logout" id={"logout"}><i className="material-icons">power_settings_new</i></a>
                </div>
            </div>
        );
    }
}
