import React from 'react';
import ReactHLS from 'react-hls';

let querystring = require('querystring');


export default class Player extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let params = {
            access_token: this.props.user.token,
        };

        let user = querystring.stringify(params);

        let url = "http://localhost:" + this.props.currentVideo.port + "/play?" + user;
        console.log(url);

        return (
            <div id={"playerWrapper"}>
                <ReactHLS url={url} height={290}/>
            </div>
        );

    }
}
