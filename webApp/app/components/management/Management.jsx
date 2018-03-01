import React from 'react';
import './../../assets/css/style.css';

export default class Management extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bodyWrapper">
                <span className="newTitle">User: </span>
                <span>{this.props.myself.username} - {this.props.myself.admin && "(admin)"}</span>
                <span className="newTitle">ID: </span>
                <span>{this.props.myself.id}</span>


                <form action={'/update_password'} method={"post"}>
                    <span className="newTitle">Update password: </span>
                    <input name={"updatePassword"} type={"password"} className={"styledInput"}/>
                    <button id="newButton" action="submit">Submit</button>
                </form>


            </div>

        );
    }

}
