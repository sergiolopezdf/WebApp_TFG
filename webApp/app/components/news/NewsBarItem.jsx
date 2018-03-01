import React from 'react';
import './../../assets/css/style.css';

export default class NewsBarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div id="newsBarItem">
            <a href={this.props.link}>{this.props.title}</a>
        </div>

    }
}
