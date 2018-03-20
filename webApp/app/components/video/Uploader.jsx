import React from 'react';
import './../assets/css/style.css';
import $ from 'jquery';

let querystring = require('querystring');

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        let params = {
            user: this.props.userId,
        };

        let user = querystring.stringify(params);

        return (
            <div id={"uploadSection"}>

                <h1>Upload a new video</h1>
                <form encType="multipart/form-data" method={"post"} action={"http://localhost:8000/upload?" + user}>
                    <input type={"file"} name={"fileToUpload"}/>
                    <button id="newButton" action="submit">Submit</button>
                </form>


            </div>
        );

    }
}
