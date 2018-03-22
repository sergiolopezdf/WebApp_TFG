import React from 'react';

export default class Management extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bodyWrapper">
                <h1>Personal data management</h1>

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
                            <form action={'/update_password'} method={"post"}>
                                <input name={"updatePassword"} type={"password"} className={"styledInput"}/>
                                <button id="newButton" action="submit">Submit</button>
                            </form>
                        </td>
                    </tr>


                </table>


            </div>

        );
    }

}
