import React from 'react';
import './../../assets/css/style.css';
import {Link} from 'react-router-dom';

export default class NewsBarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div id="newsBarItem">
            <Link to={this.props.link}>{this.props.title}</Link>
        </div>

    }
}
