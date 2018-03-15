import React from 'react';
import './../assets/css/style.css';
import ReactHLS from 'react-hls';

export default class Player extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id={"playerWrapper"}>
                <ReactHLS url={"http://localhost:8000/lbl"} height={290}/>
            </div>
        );

    }
}
