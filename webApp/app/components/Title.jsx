import React from 'react';
import {Link} from 'react-router-dom';

export default class Title extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div id="title">

                <Link to={"/"}> WebApp</Link>
            </div>
        );

    }
}
