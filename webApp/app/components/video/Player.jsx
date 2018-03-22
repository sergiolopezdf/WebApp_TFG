import React from 'react';
import ReactHLS from 'react-hls';


export default class Player extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.currentVideo);

        let url = "http://37.222.145.149:" + this.props.currentVideo.port + "/play";
        console.log(url);

        return (
            <div id={"playerWrapper"}>
                <ReactHLS url={url} height={290}/>
            </div>
        );

    }
}
