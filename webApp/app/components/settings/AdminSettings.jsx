import React from 'react';

export default class AdminSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"adminSettings"}>

                <form action={'/new_user'} method={"post"}>

                    <div className={"settingsForm"}>

                        <div>
                            <h2>Create new user</h2>
                        </div>

                        <div>
                            <div><strong>Name:</strong></div>
                            <input name={"name"} type={"text"} className={"styledInput"}/>
                        </div>

                        <div>
                            <div><strong>Username:</strong></div>
                            <input name={"username"} type={"text"} className={"styledInput"}/>
                        </div>

                        <div>
                            <div><strong>Admin:</strong></div>
                            <input name={"admin"} type={"checkbox"}/>
                        </div>


                        <div>
                            <div><strong>Password:</strong></div>
                            <input name={"password"} type={"password"} className={"styledInput"}/>
                        </div>

                        <div>
                            <button id="newButton" action="submit">Create</button>
                        </div>

                    </div>

                </form>


                <h2>Existing users</h2>

                <table>

                    <tr key={-1}>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Admin</th>
                        <th>CreatedAt</th>
                    </tr>
                    {
                        this.props.remoteUsers.map((user, key) => {

                            return (

                                <tr key={key}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.admin && "Yes"}</td>
                                    <td>{user.createdAt.substring(0, 10)}</td>
                                </tr>
                            );
                        })
                    }
                </table>
            </div>
        );
    }

}
