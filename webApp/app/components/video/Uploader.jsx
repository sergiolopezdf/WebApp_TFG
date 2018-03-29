import React from 'react';

let querystring = require('querystring');

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        let params = {
            access_token: this.props.user.token,
        };

        let user = querystring.stringify(params);

        return (
            <div id={"uploadSection"}>


                <form encType="multipart/form-data" method={"post"}

                      action={"http://localhost:8000/upload?" + user} className={"videoUploadForm"}>
                    <h1>Upload a new video</h1>
                    <input type={"file"} name={"fileToUpload"}/>
                    <button id="newButton" action="submit">Submit</button>
                </form>


            </div>
        );

    }
}
