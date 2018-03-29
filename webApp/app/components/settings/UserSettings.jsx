import React from 'react';

export default class UserSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <form action={'/update_password'} method={"post"}>

                <table class={"users"}>
                    <tr>
                        <th>Name:</th>
                        <td>{this.props.myself.name}</td>
                    </tr>
                    <tr>
                        <th>Username:</th>
                        <td>{this.props.myself.username}</td>
                    </tr>
                    <tr>
                        <th>ID:</th>
                        <td>{this.props.myself.id}</td>
                    </tr>
                    <tr>
                        <th>Admin:</th>
                        <td>{this.props.myself.admin ? "Yes" : "No"}</td>
                    </tr>

                    <tr>
                        <th>Update password:</th>
                        <td>
                            <input name={"updatePassword"} type={"password"} className={"styledInput"}/>

                        </td>
                    </tr>
                    <tr>
                        <th>
                            <button id="newButton" action="submit">Submit</button>
                        </th>
                    </tr>


                </table>
            </form>

        );
    }

}
