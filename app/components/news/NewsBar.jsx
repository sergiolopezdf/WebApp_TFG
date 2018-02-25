import React from 'react';
import './../../assets/css/style.css';
import NewsBarItem from "./NewsBarItem";

export default class NewsBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div id="newsBar">

            <div id="newsBarOptions">
                <NewsBarItem title="Show"/>
                <NewsBarItem title="Write new"/>

            </div>

        </div>;

    }
}
