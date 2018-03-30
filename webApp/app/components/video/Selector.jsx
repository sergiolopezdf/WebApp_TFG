import React from 'react';
import VideoPreview from "./VideoPreview";
import {deleteAlerts, setAvailableVideos} from "../../../redux/reducers/actions";

let querystring = require('querystring');

export default class Selector extends React.Component {

    constructor(props) {
        super(props);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this._setAvailableVideos = this._setAvailableVideos.bind(this);
    }

    _setCurrentVideo(videoId) {
        this.props.setCurrentVideo(videoId);
    }

    _setAvailableVideos(videos) {
        this.props.setAvailableVideos(videos);
    }

    async componentDidMount() {

        if (!this.props.availableVideos) {
            let params = {
                access_token: this.props.user.token,
            };

            let id = querystring.stringify(params);

            let videos = await fetch('http://localhost:8000/available_videos?' + id);

            videos = await videos.json();

            this._setAvailableVideos(videos);
        }

    }


    render() {

        if (!this.props.availableVideos) {
            return (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }



        return (

            <div id={"videoSelector"}>
                {
                    this.props.availableVideos.map((video, index) => {

                        if (video.status === "ready") {
                            return <VideoPreview video={video}
                                                 key={index}
                                                 user={this.props.user}
                                                 setCurrentVideo={this._setCurrentVideo}
                            />;
                        }

                    })
                }
            </div>
        );

    }
}
