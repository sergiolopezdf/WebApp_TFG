import React from 'react';
import './../assets/css/style.css';

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="bodyWrapper">
                <div className="newTitle">Welcome to WebApp</div>
            </div>
        );

    }
}
