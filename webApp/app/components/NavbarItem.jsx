import React from 'react';
import './../assets/css/style.css';

import {Link} from 'react-router-dom';

export default class NavbarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let url = "/" + this.props.link.toLowerCase();

        return (
            <div id="navBarItem">

                <Link to={url}>{this.props.title}</Link>


            </div>
        );

    }
}
