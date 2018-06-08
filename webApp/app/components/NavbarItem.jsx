import React from 'react';

import {Link} from 'react-router-dom';

export default class NavbarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let url = "/" + this.props.link.toLowerCase();

        return (
            <li>

                <Link to={url}><i className="material-icons">{this.props.iconName}</i>   &nbsp;
                    <span>{this.props.title}</span> </Link>

            </li>
        );

    }
}
