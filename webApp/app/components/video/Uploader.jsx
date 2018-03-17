import React from 'react';
import './../assets/css/style.css';
import ReactHLS from 'react-hls';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id={"uploadSection"}>

                <h1>Upload a new video</h1>
                <form action={"http://localhost:8000/upload"} method={"post"} encType="multipart/form-data">
                    <input type={"file"} name={"fileToUpload"}/>
                    <button id="newButton" action="submit">Submit</button>
                </form>


            </div>
        );

    }
}
