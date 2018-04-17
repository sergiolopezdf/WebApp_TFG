import React from 'react';
import Player from "./Player";
import Selector from "./Selector";
import Uploader from "./Uploader";

export default class Video extends React.Component {

    constructor(props) {
        super(props);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
        this._setAvailableVideos = this._setAvailableVideos.bind(this);
        this._deleteVideo = this._deleteVideo.bind(this);
        this._uploadVideo = this._uploadVideo.bind(this);
    }

    _setCurrentVideo(videoId) {
        this.props.setCurrentVideo(videoId);
    }

    _uploadVideo(form) {

        this.props.uploadVideo(form);

    }

    _setAvailableVideos(videos) {
        this.props.setAvailableVideos(videos);
    }

    _deleteVideo(params) {
        this.props.deleteVideo(params);
    }

    render() {

        return (
            <div id={"videoWrapper"}>
                {this.props.currentVideo && <Player user={this.props.user} videoServer={this.props.videoServer}
                                                    currentVideo={this.props.currentVideo}/>}
                <Selector availableVideos={this.props.availableVideos} user={this.props.user}
                          deleteVideo={this._deleteVideo}
                          setCurrentVideo={this._setCurrentVideo}
                          setAvailableVideos={this._setAvailableVideos}
                          videoServer={this.props.videoServer}
                />
                {
                    !this.props.uploadingVideo && <Uploader uploadVideo={this._uploadVideo} user={this.props.user}
                                                            videoServer={this.props.videoServer}/>
                }

                {
                    this.props.uploadingVideo && <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                }


            </div>
        );

    }
}
