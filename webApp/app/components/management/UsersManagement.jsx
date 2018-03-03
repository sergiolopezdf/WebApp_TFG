import React from 'react';
import './../../assets/css/style.css';

export default class UsersManagement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bodyWrapper">
                <span className="newTitle">Create new user </span>

                <form action={'/new_user'} method={"post"}>

                    <table class={"users"}>
                        <tr>
                            <th>Name:</th>
                            <td><input name={"name"} type={"text"} className={"styledInput"}/></td>
                        </tr>
                        <tr>
                            <th>Username:</th>
                            <td><input name={"username"} type={"text"} className={"styledInput"}/></td>
                        </tr>
                        <tr>
                            <th>Admin:</th>
                            <td><input name={"admin"} type={"checkbox"}/></td>
                        </tr>
                        <tr>
                            <th>Password:</th>
                            <td><input name={"password"} type={"password"} className={"styledInput"}/></td>
                        </tr>

                    </table>
                    <button id="newButton" action="submit">Create</button>

                </form>

                <span className="newTitle">Edit existing user </span>

                <table class={"users"}>

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
                                    <td>{user.createdAt}</td>
                                </tr>
                            );
                        })
                    }
                </table>


            </div>
        );
    }

}
