import React from 'react';
import UserSettings from "./UserSettings";
import AdminSettings from "./AdminSettings";

export default class Settings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bodyWrapper">
                <h1>Personal settings</h1>
                <UserSettings myself={this.props.myself}/>

                {this.props.myself.admin && <h1>Admin settings</h1>}

                {this.props.myself.admin && <AdminSettings remoteUsers={this.props.remoteUsers}/>}

            </div>

        );
    }

}
