import React from 'react';
import './../assets/css/style.css';
import Player from "./Player";
import Selector from "./Selector";
import Uploader from "./Uploader";

export default class Video extends React.Component {

    constructor(props) {
        super(props);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
    }

    _setCurrentVideo(videoId) {
        this.props.setCurrentVideo(videoId);
    }

    render() {

        return (
            <div id={"videoWrapper"}>
                {this.props.currentVideo && <Player currentVideo={this.props.currentVideo}/>}
                <Selector availableVideos={this.props.availableVideos} setCurrentVideo={this._setCurrentVideo}/>
                <Uploader/>
            </div>
        );

    }
}
