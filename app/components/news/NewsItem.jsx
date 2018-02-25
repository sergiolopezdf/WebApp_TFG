import React from 'react';
import './../../assets/css/style.css';

export default class NewsItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return [
            <div key={1}>{this.props.new.Author}</div>,
            <p key={2}>{this.props.new.Content}</p>,

        ];

    }
}
