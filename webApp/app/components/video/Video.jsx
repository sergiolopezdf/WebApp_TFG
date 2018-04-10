import React from 'react';
import Player from "./Player";
import Selector from "./Selector";
import Uploader from "./Uploader";

export default class Video extends React.Component {

    constructor(props) {
        super(props);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
        this._setAvailableVideos = this._setAvailableVideos.bind(this);
    }

    _setCurrentVideo(videoId) {
        this.props.setCurrentVideo(videoId);
    }

    _uploadVideo(data) {
        this.props.uploadVideo(data);
    }

    _setAvailableVideos(videos) {
        this.props.setAvailableVideos(videos);
    }

    render() {

        return (
            <div id={"videoWrapper"}>
                {this.props.currentVideo && <Player user={this.props.user} videoServer={this.props.videoServer}
                                                    currentVideo={this.props.currentVideo}/>}
                <Selector availableVideos={this.props.availableVideos} user={this.props.user}
                          setCurrentVideo={this._setCurrentVideo}
                          setAvailableVideos={this._setAvailableVideos}
                          videoServer={this.props.videoServer}
                />
                <Uploader user={this.props.user} videoServer={this.props.videoServer}/>
            </div>
        );

    }
}
