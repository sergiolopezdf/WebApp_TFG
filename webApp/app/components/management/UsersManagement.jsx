import React from 'react';
import './../../assets/css/style.css';

export default class UsersManagement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bodyWrapper">

                <form action={'/new_user'} method={"post"}>

                    <span className="newTitle">Create new user </span>

                    <p></p>
                    <span className="newTitle">Username: </span>
                    <input name={"username"} type={"text"} className={"styledInput"}/>
                    <span className="newTitle">Password: </span>
                    <input name={"password"} type={"password"} className={"styledInput"}/>
                    <button id="newButton" action="submit">Create</button>
                </form>

                <span className="newTitle">Edit existing user </span>

                <table id={"users"}>

                    <tr key={-1}>
                        <th>Username</th>
                        <th>Admin</th>
                        <th>Edit</th>
                    </tr>
                    {
                        this.props.remoteUsers.map((user, key) => {

                            return (

                                <tr key={key}>
                                    <td>{user.username}</td>
                                    <td>{user.admin && "Yes"}</td>
                                    <td>edit</td>
                                </tr>
                            );
                        })
                    }
                </table>


            </div>

        );
    }

}
