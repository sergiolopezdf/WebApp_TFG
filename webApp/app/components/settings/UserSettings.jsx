import React from 'react';

export default class UserSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div id={"userSettings"}>

                <form action={'/update_password'} method={"post"}>

                    <div className={"settingsForm"}>

                        <div>
                            <div><strong>Name:</strong></div>
                            <div>{this.props.myself.name}</div>
                        </div>

                        <div>
                            <div><strong>Username:</strong></div>
                            <div>{this.props.myself.username}</div>
                        </div>

                        <div>
                            <div><strong>ID:</strong></div>
                            <div>{this.props.myself.id}</div>
                        </div>

                        <div>
                            <div><strong>Admin:</strong></div>
                            <div>{this.props.myself.admin ? "Yes" : "No"}</div>
                        </div>

                        <div>
                            <div><strong>Update password:</strong></div>
                            <input name={"updatePassword"} type={"password"} className={"styledInput"}/>
                        </div>

                        <div>
                            <button id="newButton" action="submit">Submit</button>
                        </div>


                    </div>

                </form>
            </div>

        );
    }

}
