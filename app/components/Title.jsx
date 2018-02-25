import React from 'react';
import './../assets/css/style.css';

export default class Title extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div id="title">

                <a href="/"> WebApp</a>
            </div>
        );

    }
}
