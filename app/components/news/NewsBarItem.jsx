import React from 'react';
import './../../assets/css/style.css';

export default class NewsBarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div id="newsBarItem">

            {this.props.title}
        </div>

    }
}
