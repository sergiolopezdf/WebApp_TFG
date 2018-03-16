import React from 'react';
import './../assets/css/style.css';

export default class VideoPreview extends React.Component {

    constructor(props) {
        super(props);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
    }

    _setCurrentVideo() {
        this.props.setCurrentVideo(this.props.video);
    }

    render() {

        return (
            <div className={"videoPreview"} onClick={this._setCurrentVideo}>
                <div className={"videoImg"}><i class="material-icons">play_circle_outline</i></div>
            </div>
        );

    }
}
