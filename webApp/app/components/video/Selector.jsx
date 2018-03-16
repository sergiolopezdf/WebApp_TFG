import React from 'react';
import './../assets/css/style.css';
import VideoPreview from "./VideoPreview";

export default class Selector extends React.Component {

    constructor(props) {
        super(props);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
    }

    _setCurrentVideo(videoId) {
        this.props.setCurrentVideo(videoId);
    }

    render() {

        return (
            <div id={"videoSelector"}>

                {
                    this.props.availableVideos.map((video, index) => {
                        return <VideoPreview video={video}
                                             setCurrentVideo={this._setCurrentVideo}/>;
                    })
                }


            </div>
        );

    }
}
