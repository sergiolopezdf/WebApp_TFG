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

                      action={process.env.VIDEO_SERVER_URL + ':' + process.env.VIDEO_SERVER_PORT + "/upload?" + user}
                      className={"videoUploadForm"}>
                    <h1>Upload a new video</h1>

                    <table>
                        <tr>
                            <th>Name:</th>
                            <td><input type={"text"} className={"styledInput"} name={"name"}/></td>
                        </tr>

                        <tr>
                            <th>Select video:</th>
                            <td><input type={"file"} name={"fileToUpload"}/></td>
                        </tr>

                    </table>



                    <button id="newButton" action="submit">Submit</button>
                </form>


            </div>
        );

    }
}
