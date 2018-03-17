import React from 'react';
import './../assets/css/style.css';
import ReactHLS from 'react-hls';


export default class Player extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.currentVideo);

        let url = "http://localhost:" + this.props.currentVideo.port + "/play";
        console.log(url);

        return (
            <div id={"playerWrapper"}>
                <ReactHLS url={url} height={290}/>
            </div>
        );

    }
}
