import React from 'react';
import './../assets/css/style.css';

export default class NavbarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let url = "/" + this.props.link.toLowerCase();

        return (
            <div id="navBarItem">

                <a href={url}>{this.props.title}</a>

            </div>
        );

    }
}
