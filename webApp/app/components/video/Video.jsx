import React from 'react';
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

    _uploadVideo(data) {
        this.props.uploadVideo(data);
    }

    render() {

        console.log(this.props.currentVideo);

        return (
            <div id={"videoWrapper"}>
                {this.props.currentVideo && <Player currentVideo={this.props.currentVideo}/>}
                <Selector availableVideos={this.props.availableVideos} user={this.props.user}
                          setCurrentVideo={this._setCurrentVideo}/>
                <Uploader user={this.props.user}/>
            </div>
        );

    }
}
